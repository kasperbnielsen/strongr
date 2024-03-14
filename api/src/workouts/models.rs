use axum::response::IntoResponse;
use chrono::Date;
use mongodb::bson::{
    doc,
    oid::ObjectId,
    serde_helpers::{hex_string_as_object_id, rfc3339_string_as_bson_datetime},
};
use typeshare::typeshare;

#[typeshare]
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum SetType {
    Default = 0,
    WarmUp = 1,
    DropSet = 2,
    Failure = 3,
}
#[typeshare]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutModelExerciseSet {
    pub set_type: SetType,
    pub weight: i32,
    pub reps: i32,
    // Time in seconds
    pub time: u32,
}
#[typeshare]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutModelExercise {
    #[serde(with = "hex_string_as_object_id")]
    pub exercise_id: String,
    pub note: String,
    pub sets: Vec<WorkoutModelExerciseSet>,
}
#[typeshare]
#[derive(serde::Serialize, serde::Deserialize)]
pub struct WorkoutModel {
    #[serde(with = "hex_string_as_object_id")]
    pub _id: String,
    #[serde(with = "hex_string_as_object_id")]
    pub user_id: String,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutModelWithoutId {
    pub user_id: ObjectId,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}

#[derive(serde::Deserialize)]
pub struct WorkoutExerciseSetInput {
    pub set_type: SetType,
    pub weight: i32,
    pub reps: i32,
    // Time in seconds
    pub time: u32,
}

#[derive(serde::Deserialize)]
pub struct WorkoutExerciseInput {
    #[serde(with = "hex_string_as_object_id")]
    pub exercise_id: String,
    pub note: String,
    pub sets: Vec<WorkoutExerciseSetInput>,
}

#[derive(serde::Deserialize)]
pub struct CreateWorkoutInput {
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub started_at: mongodb::bson::DateTime,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub finished_at: mongodb::bson::DateTime,
}

#[derive(serde::Deserialize)]
pub struct UpdateWorkoutInput {
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutExerciseInput>,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub started_at: mongodb::bson::DateTime,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub finished_at: mongodb::bson::DateTime,
}
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutOutput {
    pub _id: String,
    pub user_id: String,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub started_at: mongodb::bson::DateTime,
    #[serde(with = "mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string")]
    pub finished_at: mongodb::bson::DateTime,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutOutputWithoutId {
    pub user_id: ObjectId,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}

impl From<WorkoutModel> for WorkoutOutput {
    fn from(value: WorkoutModel) -> Self {
        Self {
            _id: value._id,
            user_id: value.user_id,
            title: value.title,
            note: value.note,
            exercises: value.exercises,
            started_at: value.started_at,
            finished_at: value.finished_at,
        }
    }
}

impl IntoResponse for WorkoutOutput {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self).into_response()
    }
}

pub struct WorkoutOutputList {
    pub list: Vec<WorkoutOutput>,
}

impl IntoResponse for WorkoutOutputList {
    fn into_response(self) -> axum::response::Response {
        axum::Json(self.list).into_response()
    }
}

impl From<WorkoutModelExercise> for WorkoutExerciseInput {
    fn from(value: WorkoutModelExercise) -> Self {
        let mut sets = Vec::new();

        for set in value.sets {
            sets.push(set.into());
        }
        Self {
            exercise_id: value.exercise_id,
            note: value.note,
            sets,
        }
    }
}

impl From<WorkoutModelExerciseSet> for WorkoutExerciseSetInput {
    fn from(value: WorkoutModelExerciseSet) -> Self {
        Self {
            set_type: value.set_type,
            weight: value.weight,
            reps: value.reps,
            time: value.time,
        }
    }
}
