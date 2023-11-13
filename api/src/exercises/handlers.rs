use std::str::FromStr;

use axum::{
    extract::{Path, State},
    http::{
        header::{self, HeaderMap},
        StatusCode,
    },
    response::IntoResponse,
    Json,
};
use futures::StreamExt;
use mongodb::bson::{doc, oid::ObjectId};

use crate::error::{self, ApiError};

use super::models::{
    CreateExerciseInput, ExerciseModel, ExerciseModelWithoutId, ExerciseOutput, UpdateExerciseInput,
};
pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("exercises")
}

pub async fn get_exercises(State(database): State<mongodb::Client>) -> impl IntoResponse {
    let collection: mongodb::Collection<ExerciseModel> = get_collection(database);

    let mut header_map = HeaderMap::new();

    header_map.insert(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*".parse().unwrap());

    let mut cursor = collection
        .find(doc! {}, None)
        .await
        .expect("Could not find exercises");

    let mut rows: Vec<ExerciseOutput> = Vec::new();

    while let Some(Ok(doc)) = cursor.next().await {
        rows.push(doc.into());
    }

    (StatusCode::OK, header_map, Json(rows))
}

pub async fn create_exercise(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateExerciseInput>,
) -> impl IntoResponse {
    let collection = get_collection(database);

    let exercise = ExerciseModelWithoutId {
        title: payload.title,
        description: payload.description,
        exercise_type: payload.exercise_type,
    };

    if let Err(_err) = collection.insert_one(exercise, None).await {
        eprintln!("Couldnt insert exercise");
        return StatusCode::NOT_FOUND;
    }

    StatusCode::OK
}

pub async fn get_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
) -> Result<ExerciseModel, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> = get_collection(database);

    let result = collection
        .find_one(
            doc! {"_id": ObjectId::from_str(&exercise_id.to_string()).unwrap()},
            None,
        )
        .await?;

    Ok(result.unwrap())
}

pub async fn update_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
    Json(payload): Json<UpdateExerciseInput>,
) -> Result<StatusCode, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> = get_collection(database);

    collection
        .find_one_and_update(
            doc! {"_id": ObjectId::from_str(&exercise_id.to_string())?},
            doc! {"$set": { "title": payload.title, "description": payload.description, "exercise_type": payload.exercise_type as i32 }},
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}
