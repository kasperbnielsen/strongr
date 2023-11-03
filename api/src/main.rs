use axum::routing::get;
use database::setup_database_client;

mod database;
mod exercises;
mod users;
mod workouts;

pub async fn index() -> String {
    "we up!".to_string()
}

#[tokio::main]
async fn main() {
    let database = setup_database_client().await.unwrap();

    let app = axum::Router::new()
        .route("/", get(index))
        .merge(workouts::router::workout_router())
        .merge(users::router::user_router());

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));

    axum::Server::bind(&addr)
        .serve(app.with_state(database).into_make_service())
        .await
        .unwrap();
}
