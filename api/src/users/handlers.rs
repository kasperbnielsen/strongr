use axum_login::{AuthnBackend, UserId};
use std::str::FromStr;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use mongodb::{
    bson::{doc, DateTime},
    Collection,
};

use crate::error::ApiError;

use super::models::{UpdateUserInput, UserModel, UserModelOutput, UserModelWithoutId};

pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("users")
}

pub async fn get_user_by_id(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<UserModelOutput, ApiError> {
    let collection: Collection<UserModel> = get_collection(database);

    let result = collection
        .find_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            None,
        )
        .await?;

    Ok(result.unwrap().into())
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
