use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};

use crate::error::ApiError;

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

pub fn verify_token(token: String) -> Result<bool, ApiError> {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET not set!");

    let temp = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::new(jsonwebtoken::Algorithm::ES256),
    )
    .map_err(|err| match err.kind() {
        jsonwebtoken::errors::ErrorKind::ExpiredSignature => ApiError::ResourceNotFound,
        _ => ApiError::ResourceNotFound,
    })?;

    println!("{:?}", temp);

    Ok(true)
}
