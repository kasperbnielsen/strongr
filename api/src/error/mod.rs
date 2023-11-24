use axum::{http::StatusCode, response::IntoResponse, response::Response};

#[derive(Debug)]

pub enum ApiError {
    InvalidObjectId(mongodb::bson::oid::Error),
    MongoError(mongodb::error::Error),
    ResourceNotFound,
}

pub const TEXT_RED: &str = "\x1B[31m";

pub const TEXT_RESET: &str = "\x1B[39m";

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ApiError::InvalidObjectId(err) => {
                write!(f, "{TEXT_RED}{err}{TEXT_RESET}")
            }
            ApiError::MongoError(err) => err.fmt(f),
            ApiError::ResourceNotFound => write!(f, "Resource not found"),
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
            ApiError::InvalidObjectId(err) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::NOT_ACCEPTABLE;
                eprintln!("{err}");
                response
            }
            ApiError::MongoError(err) => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::BAD_REQUEST;
                eprintln!("{err}");
                response
            }
            ApiError::ResourceNotFound => {
                let mut response = Response::default();
                *response.status_mut() = StatusCode::NOT_FOUND;
                response
            }
        }
    }
}
