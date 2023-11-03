use axum::routing::{get, post};

use super::handlers::{get_user_by_id, update_user_by_id};

pub fn user_router() -> axum::Router {
    axum::Router::new().route(
        "/users/:user_id",
        get(get_user_by_id).put(update_user_by_id),
    )
}
