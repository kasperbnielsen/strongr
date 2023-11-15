use std::{borrow::BorrowMut, str::FromStr, time};

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use axum_login::tower_sessions::cookie::time::Date;
use futures::StreamExt;
use mongodb::{bson::doc, Collection};

use chrono::{DateTime, Local, NaiveDate, NaiveDateTime, NaiveTime, TimeZone, Utc};

use crate::error::ApiError;

use super::models::{
    CreateWorkoutInput, SetType, UpdateWorkoutInput, WorkoutExerciseInput, WorkoutExerciseSetInput,
    WorkoutModel, WorkoutModelExercise, WorkoutModelExerciseSet, WorkoutModelWithoutId,
    WorkoutOutput, WorkoutOutputList, WorkoutOutputWithoutId,
};

pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("workouts")
}

pub async fn create_workout(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateWorkoutInput>,
) -> Result<StatusCode, ApiError> {
    let collection: Collection<WorkoutOutputWithoutId> = get_collection(database);

    let set: WorkoutModelExerciseSet = WorkoutModelExerciseSet {
        set_type: SetType::Default,
        weight: 2,
        reps: 2,
        time: 8,
    };

    let mut sets: Vec<WorkoutModelExerciseSet> = Vec::new();

    sets.push(set);

    let exercise = WorkoutModelExercise {
        exercise_id: mongodb::bson::oid::ObjectId::from_str("123456789012222222222222")?,
        note: "123".to_string(),
        sets,
    };

    let mut exercises = Vec::new();

    exercises.push(exercise);

    let output = WorkoutOutputWithoutId {
        user_id: "123".to_string(), //change to current logged users id
        title: payload.title,
        note: payload.note,
        exercises: payload.exercises,
        started_at: payload.started_at.to_chrono(),
        finished_at: payload.finished_at.to_chrono(),
    };

    collection.insert_one(output, None).await?;

    Ok(StatusCode::OK)
}

pub async fn get_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
) -> Result<WorkoutOutput, ApiError> {
    let collection: Collection<WorkoutModel> = get_collection(database);

    let result = collection
        .find_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            None,
        )
        .await?;

    Ok(result.unwrap().into())
}

pub async fn update_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
    Json(payload): Json<UpdateWorkoutInput>,
) -> Result<StatusCode, ApiError> {
    let collection: Collection<WorkoutModel> = get_collection(database);

    collection
        .find_one_and_update(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            doc! {"title": payload.title},
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}

pub async fn delete_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
) -> Result<StatusCode, ApiError> {
    let collection: Collection<WorkoutModel> = get_collection(database);
    collection
        .delete_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            None,
        )
        .await?;

    Ok(StatusCode::OK)
}

pub async fn get_user_workouts(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<WorkoutOutputList, ApiError> {
    let collection: Collection<WorkoutModel> = get_collection(database);

    let mut cursor = collection
        .find(
            doc! {"user_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            None,
        )
        .await?;

    let mut rows: Vec<WorkoutOutput> = Vec::new();

    while let Some(Ok(doc)) = cursor.next().await {
        rows.push(doc.into());
    }

    let result = WorkoutOutputList { list: rows };

    Ok(result)
}
