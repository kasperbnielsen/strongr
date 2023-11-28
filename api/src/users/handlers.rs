use std::str::FromStr;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use mongodb::{bson::doc, Collection};

use crate::{error::ApiError, jwt::logic::encode_token};

use super::models::{UpdateUserInput, UserModel, UserModelOutput, UserModelWithoutId};

pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("users")
}

pub fn hash_password(password: String) -> Result<String, ApiError> {
    bcrypt::hash(password, 10).map_err(|_error| ApiError::ResourceNotFound)
}

pub async fn get_user_by_id(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<UserModelOutput, ApiError> {
    let collection: Collection<UserModel> = get_collection(database);

    let result = collection
        .find_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(user_id.as_str())?},
            None,
        )
        .await?;

    result.map_or(Err(ApiError::ResourceNotFound), |x| Ok(x.into()))
}

pub async fn create_user(
    State(database): State<mongodb::Client>,
    Json(payload): Json<UpdateUserInput>,
) -> Result<StatusCode, ApiError> {
    let collection = get_collection(database);

    collection
        .insert_one(
            UserModelWithoutId {
                first_name: payload.first_name,
                last_name: payload.last_name,
                token: encode_token(payload.email.clone()).unwrap(),
                email: payload.email,
                password: hash_password(payload.password)?,
            },
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}

pub async fn update_user_by_id(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
    Json(payload): Json<UpdateUserInput>,
) -> Result<StatusCode, ApiError> {
    let collection: Collection<UserModel> = get_collection(database);

    collection
        .find_one_and_update(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            doc! {"$set": {"first_name": payload.first_name, "last_name": payload.last_name}},
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}
