use core::str::FromStr;

use axum::{extract::State, http::StatusCode, Json};
use mongodb::{
    bson::{doc, oid::ObjectId},
    Collection,
};

use crate::{
    error::ApiError,
    jwt::{
        logic::{encode_refresh_token, encode_token},
        models::RefreshToken,
    },
};

use super::models::{UserAuthResponse, UserCredentials, UserModel};

pub fn get_collection<T>(database: mongodb::Client, name: &str) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>(name)
}

pub fn verify_password(password: String, hash: &str) -> Result<bool, ApiError> {
    bcrypt::verify(password, hash).map_err(|_error| ApiError::ResourceNotFound)
}

pub async fn authenticate_credentials(
    State(database): State<mongodb::Client>,
    Json(payload): Json<UserCredentials>,
) -> Result<UserAuthResponse, ApiError> {
    let collection: Collection<UserModel> = get_collection(database.clone(), "users");
    let token_collection: Collection<RefreshToken> = get_collection(database, "refresh");

    let user = collection
        .find_one(doc! { "email": payload.email}, None)
        .await?;

    if let Some(new_user) = user {
        if !verify_password(payload.password, &new_user.password)? {
            return Err(ApiError::Unauthorized(StatusCode::UNAUTHORIZED));
        }

        let new_token = encode_refresh_token(ObjectId::from_str(&new_user._id)?).await?;
        let jwt_token = encode_token(&new_user._id).await?;

        token_collection.insert_one(&new_token, None).await?;

        Ok(UserAuthResponse {
            model: new_user,
            token: jwt_token,
            refresh: new_token.token,
        })
    } else {
        println!("Resource not found");
        Err(ApiError::ResourceNotFound)
    }
}
