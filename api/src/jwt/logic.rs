use axum::{http::Request, middleware::Next, response::Response};
use axum_auth::AuthBearer;
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};

use crate::{authentication::models::UserModel, error::ApiError};

use super::models::Claims;

pub fn encode_token(issuer: String) -> Result<String, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");

    let mut time = Utc::now();
    let iat = time.timestamp() as usize;
    let expiration_duration = Duration::seconds(60);
    time += expiration_duration;
    let exp = time.timestamp() as usize;
    let claim = Claims { exp, iat, issuer };
    let encoding_key = EncodingKey::from_secret(secret.as_bytes());
    encode(&Header::default(), &claim, &encoding_key).map_err(|_error| ApiError::ResourceNotFound)
}

pub async fn verify_token<T>(req: Request<T>, next: Next<T>) -> Response {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");
    let _ = decode::<Claims>(
        req.headers()
            .get("Authorization")
            .unwrap()
            .to_str()
            .unwrap(),
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::new(jsonwebtoken::Algorithm::ES256),
    )
    .map_err(|err| match err.kind() {
        jsonwebtoken::errors::ErrorKind::ExpiredSignature => ApiError::ResourceNotFound,
        _ => ApiError::ResourceNotFound,
    });

    let response = next.run(req).await;

    response
}
