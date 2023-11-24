

use axum::response::IntoResponse;
use mongodb::bson::oid::ObjectId;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct UserModel {
    pub _id: ObjectId,
    pub first_name: String,
    pub last_name: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct UserModelWithoutId {
    pub first_name: String,
    pub last_name: String,
}

#[derive(serde::Deserialize)]
pub struct UpdateUserInput {
    pub first_name: String,
    pub last_name: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct UserModelOutput {
    pub _id: String,
    pub first_name: String,
    pub last_name: String,
}

impl From<UserModel> for UserModelOutput {
    fn from(value: UserModel) -> Self {
        Self {
            _id: value._id.to_hex(),
            first_name: value.first_name,
            last_name: value.last_name,
        }
    }
}

impl IntoResponse for UserModelOutput {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}
