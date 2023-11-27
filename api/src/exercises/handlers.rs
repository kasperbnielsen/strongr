use std::str::FromStr;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use futures::StreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId},
    results::InsertOneResult,
};

use crate::error::ApiError;

use super::models::{
    CreateExerciseInput, ExerciseModel, ExerciseModelWithoutId, ExerciseOutput, ExerciseOutputList,
    UpdateExerciseInput,
};
pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("exercises")
}

pub async fn get_exercises(
    State(database): State<mongodb::Client>,
) -> Result<ExerciseOutputList, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> = get_collection(database);

    let mut cursor = collection.find(doc! {}, None).await?;

    let mut rows: Vec<ExerciseOutput> = Vec::new();

    while let Some(Ok(doc)) = cursor.next().await {
        rows.push(doc.into());
    }

    let result = ExerciseOutputList { list: rows };

    Ok(result)
}

pub async fn create_exercise_for_user(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
    Json(payload): Json<CreateExerciseInput>,
) -> Result<(StatusCode, Json<InsertOneResult>), ApiError> {
    let collection = get_collection(database);

    const HARDCODED_USER: &str = "6544111bdae4c520a44a8bdb";

    let exercise = ExerciseModelWithoutId {
        title: payload.title,
        description: payload.description,
        exercise_type: payload.exercise_type,
        user_id: Some(ObjectId::from_str(&user_id)?),
    };

    collection
        .insert_one(exercise, None)
        .await
        .map(|value| (StatusCode::CREATED, axum::Json(value)))
        .map_err(ApiError::from)
}

pub async fn create_exercise(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateExerciseInput>,
) -> Result<StatusCode, ApiError> {
    let collection = get_collection(database);

    let exercise = ExerciseModelWithoutId {
        title: payload.title,
        description: payload.description,
        exercise_type: payload.exercise_type,
        user_id: None,
    };

    collection.insert_one(exercise, None).await?;

    Ok(StatusCode::OK)
}

pub async fn get_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
) -> Result<ExerciseOutput, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> = get_collection(database);

    let result = collection
        .find_one(
            doc! {"_id": ObjectId::from_str(&exercise_id.to_string())?},
            None,
        )
        .await?;

    Ok(result.unwrap().into())
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