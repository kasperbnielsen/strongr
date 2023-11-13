use std::str::FromStr;

use axum::{
    body::Body,
    extract::{Path, State},
    Json,
};
use mongodb::{
    bson::{bson, doc, oid::ObjectId},
    options::UpdateModifications,
};

use crate::workouts::models::WorkoutModelExercise;

use super::models::{
    CreateWorkoutInput, UpdateWorkoutInput, WorkoutExerciseInput, WorkoutExerciseSetInput,
    WorkoutModel, WorkoutModelExerciseSet, WorkoutModelWithoutId,
};

pub fn get_collection(database: mongodb::Client) -> mongodb::Collection<WorkoutModelWithoutId> {
    database
        .database("strongr")
        .collection::<WorkoutModelWithoutId>("workouts")
}

pub async fn create_workout(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateWorkoutInput>,
) {
    let collection = get_collection(database);

    if let Err(err) = collection
        .insert_one(
            WorkoutModelWithoutId {
                user_id: mongodb::bson::oid::ObjectId::from_str("123").unwrap(),
                title: payload.title,
                note: payload.note,
                exercises: payload.exercises,
                started_at: payload.started_at,
                finished_at: payload.finished_at,
            },
            None,
        )
        .await
    {
        eprintln!("{err}");
    }
}

pub async fn get_workout_by_id(State(database): State<mongodb::Client>, workout_id: Path<String>) {
    let collection = get_collection(database);

    match collection
        .find(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            None,
        )
        .await
    {
        Ok(result) => println!("{:?}", result),
        Err(err) => eprintln!("{err}"),
    }
}

pub async fn update_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
    Json(payload): Json<UpdateWorkoutInput>,
) {
    let collection = get_collection(database);

    if let Err(err) = collection
        .find_one_and_update(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            doc! {"title": payload.title},
            None,
        )
        .await
    {
        eprintln!("{err}");
    }
}

pub async fn delete_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
) {
    let collection = get_collection(database);
    if let Err(err) = collection
        .delete_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&workout_id.to_string()).unwrap()},
            None,
        )
        .await
    {
        eprint!("{err}");
    }
}

pub async fn get_user_workouts(State(database): State<mongodb::Client>, user_id: Path<String>) {
    let collection = get_collection(database);

    match collection
        .find(
            doc! {"user_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            None,
        )
        .await
    {
        Ok(result) => println!("{:?}", result.deserialize_current()),
        Err(err) => eprintln!("{err}"),
    }
}
