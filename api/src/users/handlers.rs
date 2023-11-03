use axum::{
    extract::{Path, State},
    Json,
};
use mongodb::Client;

pub async fn get_user_by_id(State(database): State<mongodb::Client>, user_id: Path<String>) {
    todo!()
}

pub async fn update_user_by_id(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
    Json(payload): Json<UpdateUserInput>,
) {
    todo!()
}
