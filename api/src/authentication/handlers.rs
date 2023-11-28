use axum::{extract::State, http::StatusCode, Json};
use futures::TryFutureExt;
use mongodb::{bson::doc, Collection};

use crate::{error::ApiError, jwt::logic::encode_token};

use super::models::{UserCredentials, UserModel};

pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("users")
}

pub fn verify_password(password: String, hash: &str) -> Result<bool, ApiError> {
    bcrypt::verify(password, hash).map_err(|error| ApiError::ResourceNotFound)
}

pub async fn authenticate_credentials(
    State(database): State<mongodb::Client>,
    Json(payload): Json<UserCredentials>,
) -> Result<UserModel, ApiError> {
    let collection: Collection<UserModel> = get_collection(database);

    let user = collection
        .find_one(doc! { "email": payload.email}, None)
        .await?;

    if let Some(new_user) = user {
        if !verify_password(payload.password, &new_user.password)? {
            return Err(ApiError::Unauthorized(StatusCode::UNAUTHORIZED));
        }
        let auth_user = collection
            .find_one_and_update(
                doc! {"email": &new_user.email},
                doc! {"$set": { "token": encode_token(new_user.email.to_string()).unwrap()}},
                None,
            )
            .await?;
        Ok(auth_user.unwrap())
    } else {
        println!("Resource not found");
        Err(ApiError::ResourceNotFound)
    }
}
