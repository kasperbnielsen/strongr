use axum::{
    body::Body,
    extract::{Path, State},
};
use mongodb::bson::oid::ObjectId;

use super::models::{CreateWorkoutInput, UpdateWorkoutInput};

pub async fn create_workout(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateWorkoutInput>,
) {
    todo!()
}

pub async fn get_workout_by_id(State(database): State<mongodb::Client>, workout_id: Path<String>) {
    todo!()
}

pub async fn update_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
    Json(payload): Json<UpdateWorkoutInput>,
) {
    todo!()
}

pub async fn delete_workout_by_id(
    State(database): State<mongodb::Client>,
    workout_id: Path<String>,
) {
    todo!()
}

pub async fn get_user_workouts(State(database): State<mongodb::Client>, user_id: Path<String>) {
    todo!()
}
