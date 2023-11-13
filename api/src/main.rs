use axum::routing::{get, post};
use database::setup_database_client;
use exercises::handlers::{
    create_exercise, get_exercise_by_id, get_exercises, update_exercise_by_id,
};
use tower_http::cors::{Any, CorsLayer};
use users::handlers::{create_user, get_user_by_id, update_user_by_id};
use workouts::handlers::{
    create_workout, delete_workout_by_id, get_user_workouts, get_workout_by_id,
    update_workout_by_id,
};

mod database;
mod error;
mod exercises;
mod users;
mod workouts;

pub async fn index() -> String {
    "we up!".to_string()
}

#[tokio::main]
async fn main() {
    let database = setup_database_client().await.unwrap();
    let layer: CorsLayer = CorsLayer::new().allow_origin(Any).allow_headers(Any)

    let app = axum::Router::new()
        .route("/", get(index))
        .route("/users", post(create_user))
        .route(
            "/users/:user_id",
            get(get_user_by_id).put(update_user_by_id),
        )
        .route("/exercises", get(get_exercises).post(create_exercise))
        .route(
            "/exercises/:exercise_id",
            get(get_exercise_by_id).put(update_exercise_by_id),
        )
        .route("/workouts", post(create_workout))
        .route(
            "/workouts/:workout_id",
            get(get_workout_by_id)
                .put(update_workout_by_id)
                .delete(delete_workout_by_id),
        )
        .route("/users/:user_id/workouts", get(get_user_workouts))
        .layer(layer);

    let app = app.with_state(database);

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
