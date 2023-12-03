use axum::response::IntoResponse;
use mongodb::bson::serde_helpers::hex_string_as_object_id;
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
}
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct UserAuthResponse {
    pub model: UserModel,
    pub token: String,
    pub refresh: String,
}

impl IntoResponse for UserAuthResponse {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}

impl IntoResponse for UserModel {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}
