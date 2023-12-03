use std::str::FromStr;

use axum::{
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
    Json,
};
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};
use uuid::Uuid;

use crate::{authentication::handlers::get_collection, error::ApiError};

use super::models::{Claims, RefreshToken};

pub async fn encode_token(issuer: &str) -> Result<String, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");

    let mut time = Utc::now();
    let iat = time.timestamp() as usize;
    let expiration_duration = Duration::seconds(6000);
    time += expiration_duration;
    let exp = time.timestamp() as usize;
    let claim = Claims {
        exp,
        iat,
        issuer: issuer.to_string(),
    };
    let encoding_key = EncodingKey::from_secret(secret.as_bytes());
    encode(&Header::default(), &claim, &encoding_key).map_err(|_error| ApiError::ResourceNotFound)
}

pub async fn verify_token<T>(req: Request<T>, next: Next<T>) -> Result<Response, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");
    let token = req.headers().get("Authorization").map(|header| {
        if let Some((_, a)) = header.to_str().unwrap_or_default().split_once(' ') {
            return a.to_string();
        }
        String::new()
    });

    decode::<Claims>(
        &token.unwrap_or_default(),
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )?;

    Ok(next.run(req).await)
}

pub async fn get_user_id(token: String) -> Result<String, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");
    let decoded = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )?;

    Ok(decoded.claims.issuer)
}

pub async fn encode_refresh_token(user_id: ObjectId) -> Result<RefreshToken, ApiError> {
    let token = Uuid::new_v4();
    let mut time = Utc::now();
    let duration = Duration::days(14);
    time += duration;
    let exp = time.timestamp();

    let date = DateTime::from_millis(exp * 1000);

    let refresh_token = RefreshToken {
        user_id: user_id,
        token: token.to_string(),
        exp: date,
    };

    Ok(refresh_token)
}

pub async fn refresh_jwt_token(
    State(database): State<mongodb::Client>,
    Json(payload): Json<(String, String)>,
) -> Result<String, ApiError> {
    let collection: Collection<RefreshToken> = get_collection(database, "refresh");

    let new_token = encode_refresh_token(ObjectId::from_str(&payload.0)?).await?;

    let token = collection
        .find_one_and_update(
            doc! {"token": payload.1, "exp": {"$gte": DateTime::now()}},
            doc! {"token": new_token.token, "exp": new_token.exp},
            None,
        )
        .await?;

    if let Some(token) = token {
        return Ok(encode_token(&token.user_id.to_hex()).await?);
    }

    Err(ApiError::Unauthorized(StatusCode::UNAUTHORIZED))
}
