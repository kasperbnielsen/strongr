use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use futures::StreamExt;
use mongodb::{bson::doc, options::FindOptions};

use crate::{error::ApiError, get_collection};

use super::models::{Routine, RoutineExercise, RoutineModel, Routines};

pub async fn create_routine(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
    Json(payload): Json<Routine>,
) -> Result<StatusCode, ApiError> {
    let collection = get_collection(database, "routines".to_string());

    collection
        .insert_one(
            RoutineModel {
                user_id: user_id.to_string(),
                title: payload.title,
                exercises: payload.exercises,
            },
            None,
        )
        .await?;

    Ok(StatusCode::CREATED)
}

pub async fn get_routines(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<Routines, ApiError> {
    let collection = get_collection(database, "routines".to_string());

    let mut cursor = collection
        .find(
            doc! { "user_id": user_id.to_string()},
            FindOptions::builder().sort(doc! {"_id": -1}).build(),
        )
        .await?;

    let mut list: Vec<Routine> = Vec::new();

    while let Some(Ok(doc)) = cursor.next().await {
        if let Ok(val) = mongodb::bson::from_document(doc) {
            list.push(val)
        }
    }

    Ok(Routines { list })
}
