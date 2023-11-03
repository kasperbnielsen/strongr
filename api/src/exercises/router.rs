use axum::routing::{get, post};

use super::handlers::{create_exercise, get_exercise_by_id, get_exercises, update_exercise_by_id};

pub fn exercise_router() -> axum::Router {
    axum::Router::new()
        .route("/exercises", get(get_exercises).post(create_exercise))
        .route(
            "/exercises/:exercise_id",
            get(get_exercise_by_id).put(update_exercise_by_id),
        )
}
