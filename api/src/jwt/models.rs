use axum::response::IntoResponse;
use mongodb::bson::{oid::ObjectId, DateTime};

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Claims {
    pub exp: usize,
    pub iat: usize,
    pub issuer: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct RefreshToken {
    pub user_id: ObjectId,
    pub token: String,
    pub exp: DateTime,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct TokenResponse {
    pub refreshToken: String,
    pub userid: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct RefreshTokenString {
    pub token: String,
    pub refreshToken: String,
}

impl IntoResponse for RefreshTokenString {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}

impl IntoResponse for RefreshToken {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}
