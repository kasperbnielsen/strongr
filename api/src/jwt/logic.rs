use axum::{http::Request, middleware::Next, response::Response};
use axum_auth::AuthBearer;
use chrono::{Days, Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};

use crate::{authentication::models::UserModel, error::ApiError};

use super::models::Claims;

pub fn encode_token(issuer: String) -> Result<String, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");

    let mut time = Utc::now();
    let iat = time.timestamp() as usize;
    let expiration_duration = Duration::seconds(6000);
    time += expiration_duration;
    let exp = time.timestamp() as usize;
    time.checked_add_days(Days::new(3));
    let claim = Claims { exp, iat, issuer };
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
