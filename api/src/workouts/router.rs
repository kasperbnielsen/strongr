use axum::routing::{get, post};

use super::handlers::{
    create_workout, delete_workout_by_id, get_workout_by_id, update_workout_by_id,
};

pub fn workout_router() -> axum::Router {
    axum::Router::new()
        .route("/workouts", post(create_workout))
        .route(
            "/workouts/:workout_id",
            get(get_workout_by_id)
                .put(update_workout_by_id)
                .delete(delete_workout_by_id),
        )
}
