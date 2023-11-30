use authentication::handlers::authenticate_credentials;
use axum::{
    extract::State,
    http::{header::AUTHORIZATION, Request},
    routing::{get, post, put},
};
use axum_auth::AuthBearer;
use database::setup_database_client;
use exercises::handlers::{
    create_exercise, create_exercise_for_user, get_exercise_by_id, get_exercises,
    update_exercise_by_id,
};
use jwt::logic::verify_token;
use tower_http::cors::{Any, CorsLayer};
use users::handlers::{create_user, get_user_by_id, update_user_by_id};
use workouts::handlers::{
    create_workout, delete_workout_by_id, get_user_workouts, get_workout_by_id,
    update_workout_by_id,
};

mod authentication;
mod database;
mod error;
mod exercises;
mod jwt;
mod users;
mod workouts;

pub async fn index() -> String {
    "we up!".to_string()
}

#[tokio::main]
async fn main() {
    let database = setup_database_client().await.unwrap();
    let layer: CorsLayer = CorsLayer::new().allow_origin(Any).allow_headers(Any);
    let AuthBearer(token): AuthBearer;

    let app = axum::Router::new()
        .route("/workouts", post(create_workout))
        .layer(axum::middleware::from_fn(verify_token))
        .route("/users", post(create_user))
        .route("/", get(index))
        .route(
            "/users/:user_id",
            get(get_user_by_id).put(update_user_by_id),
        )
        .route("/exercises", get(get_exercises).post(create_exercise))
        .route("/users/:user_id/exercises", post(create_exercise_for_user))
        .route(
            "/exercises/:exercise_id",
            get(get_exercise_by_id).put(update_exercise_by_id),
        )
        .route(
            "/workouts/:workout_id",
            get(get_workout_by_id)
                .put(update_workout_by_id)
                .delete(delete_workout_by_id),
        )
        .route("/users/:user_id/workouts", get(get_user_workouts))
        .route("/auth", post(authenticate_credentials))
        .layer(layer);

    let app = app.with_state(database);

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
