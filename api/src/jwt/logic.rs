use axum::http::StatusCode;
use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};

use crate::error::ApiError;

use super::models::Claims;

pub fn encode_token() -> Result<String, ApiError> {
    let mut time = Utc::now();
    let iat = time.timestamp() as usize;
    let expiration_duration = Duration::seconds(60);
    time += expiration_duration;
    let exp = time.timestamp() as usize;
    let claim = Claims { exp, iat };
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");
    let encoding_key = EncodingKey::from_secret(secret.as_bytes());
    encode(&Header::default(), &claim, &encoding_key).map_err(|_error| ApiError::ResourceNotFound)
}

pub fn verify_token() -> Result<bool, StatusCode> {
    todo!()
}
