use axum::{http::StatusCode, response::IntoResponse, response::Response};

#[derive(Debug)]

pub enum ApiError {
    InvalidObjectId(mongodb::bson::oid::Error),
    MongoError(mongodb::error::Error),
    ResourceNotFound,
    Unauthorized(StatusCode),
    JwtError(jsonwebtoken::errors::Error),
    ExpiredToken,
}

pub const TEXT_RED: &str = "\x1B[31m";

pub const TEXT_RESET: &str = "\x1B[39m";

impl core::fmt::Display for ApiError {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        match self {
            Self::InvalidObjectId(err) => {
                write!(f, "{TEXT_RED}{err}{TEXT_RESET}")
            }
            Self::MongoError(err) => err.fmt(f),
            Self::ResourceNotFound => write!(f, "Resource not found"),
            Self::Unauthorized(err) => err.fmt(f),
            Self::JwtError(err) => err.fmt(f),
            Self::ExpiredToken => write!(f, "Token is expired"),
        }
    }
}

impl From<jsonwebtoken::errors::Error> for ApiError {
    fn from(value: jsonwebtoken::errors::Error) -> Self {
        match value.kind() {
            jsonwebtoken::errors::ErrorKind::ExpiredSignature => Self::ExpiredToken,
            _ => Self::JwtError(value),
        }
    }
}

impl From<mongodb::bson::oid::Error> for ApiError {
    fn from(value: mongodb::bson::oid::Error) -> Self {
        Self::InvalidObjectId(value)
    }
}

impl From<mongodb::error::Error> for ApiError {
    fn from(value: mongodb::error::Error) -> Self {
        Self::MongoError(value)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        match self {
            Self::InvalidObjectId(err) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::NOT_ACCEPTABLE;
                eprintln!("{err}");
                response
            }
            Self::MongoError(err) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::BAD_REQUEST;
                eprintln!("{err}");
                response
            }
            Self::ResourceNotFound => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::NOT_FOUND;
                response
            }
            Self::Unauthorized(_) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::UNAUTHORIZED;
                response
            }
            Self::JwtError(err) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::UNAUTHORIZED;
                eprintln!("{err:?}");
                response
            }
            Self::ExpiredToken => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::IM_A_TEAPOT;
                response
            }
        }
    }
}
