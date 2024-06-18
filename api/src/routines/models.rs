use axum::response::IntoResponse;
#[derive(serde::Deserialize, serde::Serialize)]

pub struct RoutineExercise {
    pub title: String,
    pub exercise_id: String,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Routine {
    pub title: String,
    pub exercises: Vec<RoutineExercise>,
}
#[derive(serde::Serialize, serde::Deserialize)]
pub struct RoutineModel {
    pub user_id: String,
    pub title: String,
    pub exercises: Vec<RoutineExercise>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Routines {
    pub list: Vec<Routine>,
}

impl IntoResponse for Routines {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}
