use axum::extract::Path;

use super::models::{CreateExerciseInput, UpdateExerciseInput};

pub async fn get_exercises() {
    todo!()
}

pub async fn create_exercise(
    State(database): State<mongodb::Client>,
    Json(payload): Json<CreateExerciseInput>,
) {
    todo!()
}

pub async fn get_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
) {
    todo!()
}

pub async fn update_exercise_by_id(
    State(database): State<mongodb::Client>,
    exercise_id: Path<String>,
    Json(payload): Json<UpdateExerciseInput>,
) {
    todo!()
}
