use core::str::FromStr;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};

use axum_auth::AuthBearer;

use chrono::DateTime;
use futures::StreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::FindOneOptions,
    results::InsertOneResult,
    Collection,
};

use crate::{error::ApiError, jwt::logic::get_user_id};

use super::models::{
    CreateWorkoutInput, UpdateWorkoutInput, WorkoutModel, WorkoutModelExercise,
    WorkoutModelExerciseSet, WorkoutOutput, WorkoutOutputList, WorkoutOutputWithoutId,
};

pub fn get_collection<T>(database: mongodb::Client) -> mongodb::Collection<T> {
    database.database("strongr").collection::<T>("workouts")
}

pub async fn create_workout(
    State(database): State<mongodb::Client>,
    AuthBearer(token): AuthBearer,
    Json(payload): Json<CreateWorkoutInput>,
) -> Result<(StatusCode, Json<InsertOneResult>), ApiError> {
    let collection: Collection<WorkoutOutputWithoutId> = get_collection(database);

    let result = payload
        .exercises
        .into_iter()
        .map(|exercise| WorkoutModelExercise {
            exercise_id: exercise.exercise_id,
            note: exercise.note,
            sets: exercise
                .sets
                .into_iter()
                .map(|set| WorkoutModelExerciseSet {
                    set_type: set.set_type,
                    weight: set.weight,
                    reps: set.reps,
                    time: set.time,
                })
                .collect::<Vec<_>>(),
        })
        .collect::<Vec<_>>();

    let user = get_user_id(token).await?;

    let output = WorkoutOutputWithoutId {
        user_id: ObjectId::from_str(&user)?, //change to current logged users id
        title: payload.title,
        note: payload.note,
        exercises: result,
        started_at: payload.started_at,
        finished_at: payload.finished_at,
    };

    collection
        .insert_one(output, None)
        .await
        .map(|value| (StatusCode::CREATED, axum::Json(value)))
        .map_err(ApiError::from)
}

pub async fn get_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
) -> Result<WorkoutOutput, ApiError> {
    get_collection::<WorkoutModel>(database)
        .find_one(doc! {"_id": ObjectId::from_str(workout_id.as_str())?}, None)
        .await?
        .map_or(Err(ApiError::ResourceNotFound), |x| Ok(x.into()))
}

pub async fn get_latest_workout(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
) -> Result<String, ApiError> {
    get_collection::<WorkoutModel>(database)
        .find_one(
            doc! {"user_id": ObjectId::from_str(&user_id)?},
            FindOneOptions::builder().sort(doc! {"_id": -1}).build(),
        )
        .await?
        .map_or(Err(ApiError::ResourceNotFound), |res| {
            println!("{:?}", res.started_at.to_chrono().to_string());
            Ok(res.started_at.to_chrono().to_string())
        })
}

pub async fn update_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
    Json(payload): Json<UpdateWorkoutInput>,
) -> Result<StatusCode, ApiError> {
    let collection: Collection<WorkoutModel> = get_collection(database);

    let exercises = payload.exercises.into_iter().map(|exercise| {
            doc!{"exercise_id": exercise.exercise_id, "note": exercise.note, "sets": exercise.sets.into_iter().map(|set| {
                doc!{"set_type": set.set_type as i32, "weight": set.weight, "reps": set.reps, "time": set.time}
            }).collect::<Vec<_>>()}
        }).collect::<Vec<_>>();

    collection
        .find_one_and_update(
            doc! {"_id": ObjectId::from_str(workout_id.as_str())?},
            doc! {"$set": doc! {
                "title": payload.title,
                "note": payload.note,
                "exercises": exercises,
                "started_at": payload.started_at,
                "finished_at": payload.finished_at
            }
            },
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
        .delete_one(doc! {"_id": ObjectId::from_str(workout_id.as_str())?}, None)
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
            doc! {"user_id": ObjectId::from_str(user_id.as_str())?},
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
