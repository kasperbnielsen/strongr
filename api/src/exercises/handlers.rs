use core::{fmt, str::FromStr};

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use futures::{StreamExt, TryStreamExt};
use mongodb::{
    bson::{doc, oid::ObjectId, Bson},
    options::FindOneOptions,
    results::InsertOneResult,
    Collection,
};

use crate::{error::ApiError, workouts::models::WorkoutModelExercise};

use super::models::{
    CreateExerciseInput, ExerciseList, ExerciseModel, ExerciseModelWithoutId, ExerciseOutput,
    ExerciseOutputList, PreviousExerciseInput, PreviousExercises, PreviousExercisesList,
    UpdateExerciseInput,
};
pub fn get_collection<T>(database: mongodb::Client, collection: String) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>(&collection)
}

pub async fn get_exercises(
    State(database): State<mongodb::Client>,
) -> Result<ExerciseOutputList, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> =
        get_collection(database, "exercises".to_string());

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
    let collection = get_collection(database, "exercises".to_string());

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
    let collection = get_collection(database, "exercises".to_string());

    let exercise = ExerciseModelWithoutId {
        title: payload.title,
        description: payload.description,
        exercise_type: payload.exercise_type,
        user_id: None,
    };

    collection.insert_one(exercise, None).await?;

    Ok(StatusCode::OK)
}

pub async fn get_exercise_by_ids(
    State(database): State<mongodb::Client>,
    Json(payload): Json<Vec<String>>,
) -> Result<ExerciseList, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> =
        get_collection(database, "exercises".to_string());

    let temp: Vec<ObjectId> = payload
        .into_iter()
        .filter_map(|id| ObjectId::from_str(&id).ok())
        .collect();

    let result = collection.find(doc! {"_id": {"$in": temp}}, None).await?;

    let list: Vec<ExerciseModel> = result.try_collect().await?;

    Ok(ExerciseList { list })
}

pub async fn get_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
) -> Result<ExerciseOutput, ApiError> {
    let collection: mongodb::Collection<ExerciseModel> =
        get_collection(database, "exercises".to_string());

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
    let collection: mongodb::Collection<ExerciseModel> =
        get_collection(database, "exercises".to_string());

    collection
        .find_one_and_update(
            doc! {"_id": ObjectId::from_str(&exercise_id.to_string())?},
            doc! {"$set": { "title": payload.title, "description": payload.description, "exercise_type": payload.exercise_type as i32 }},
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}

pub async fn get_previous(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<PreviousExercisesList, ApiError> {
    let collection: Collection<PreviousExercises> =
        get_collection(database, "workouts".to_string());

    let mut cursor = collection
        .aggregate(
            [
                doc! {
                  "$match": doc! {
                    "user_id": ObjectId::parse_str(&user_id.to_string())?,
                  },
                },
                doc! {
                  "$sort": doc! {
                    "_id": -1,
                  },
                },
                doc! {
                  "$unwind": "$exercises",
                },
                doc! {
                  "$group": doc! {
                    "_id": "$exercises.exercise_id",
                    "sets": doc! {
                      "$first": "$exercises.sets",
                    },
                  },
                },
            ],
            None,
        )
        .await?;

    let mut list = Vec::new();

    while let Some(Ok(doc)) = cursor.next().await {
        if let Ok(val) = mongodb::bson::from_document(doc) {
            list.push(val)
        }
    }

    Ok(PreviousExercisesList { list })
}
