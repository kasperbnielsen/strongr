use axum::{response::IntoResponse, Json};
use mongodb::bson::{oid::ObjectId, serde_helpers::hex_string_as_object_id};
use typeshare::typeshare;

#[derive(serde::Deserialize, Debug)]

pub struct UserCredentials {
    pub email: String,
    pub password: String,
}
#[typeshare]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct UserModel {
    #[serde(with = "hex_string_as_object_id")]
    pub _id: String,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String,
    pub token: String,
}

impl IntoResponse for UserModel {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}
