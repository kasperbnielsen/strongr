use axum::response::IntoResponse;

#[derive(serde::Deserialize)]

pub struct UserCredentials {
    pub email: String,
    pub password: String,
}

#[derive(serde::Deserialize)]
pub struct UserModel {
    pub email: String,
    pub password: String,
    pub token: String,
}

impl IntoResponse for UserModel {
    fn into_response(self) -> axum::response::Response {
        self.into_response()
    }
}

impl From<UserCredentials> for UserModel {
    fn from(value: UserCredentials) -> Self {
        UserModel {
            email: value.email,
            password: value.password,
            token: String::new(),
        }
    }
}
