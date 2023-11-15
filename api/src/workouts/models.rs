use axum::response::IntoResponse;
use axum_login::tower_sessions::cookie::time::{Date, UtcOffset};
use chrono::{DateTime, Utc};
use mongodb::bson::oid::ObjectId;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum SetType {
    Default = 0,
    WarmUp = 1,
    DropSet = 2,
    Failure = 3,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutModelExerciseSet {
    pub set_type: SetType,
    pub weight: i32,
    pub reps: i32,
    // Time in seconds
    pub time: u32,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutModelExercise {
    pub exercise_id: ObjectId,
    pub note: String,
    pub sets: Vec<WorkoutModelExerciseSet>,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct WorkoutModel {
    pub _id: ObjectId,
    pub user_id: ObjectId,
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
    pub exercise_id: String,
    pub note: String,
    pub sets: Vec<WorkoutExerciseSetInput>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct CreateWorkoutInput {
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}

#[derive(serde::Deserialize)]
pub struct UpdateWorkoutInput {
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutExerciseInput>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutOutput {
    pub _id: String,
    pub user_id: String,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    pub started_at: mongodb::bson::DateTime,
    pub finished_at: mongodb::bson::DateTime,
}
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutOutputWithoutId {
    pub user_id: String,
    pub title: String,
    pub note: String,
    pub exercises: Vec<WorkoutModelExercise>,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub started_at: DateTime<Utc>,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub finished_at: DateTime<Utc>,
}

impl From<WorkoutOutput> for WorkoutOutputWithoutId {
    fn from(value: WorkoutOutput) -> Self {
        Self {
            user_id: value.user_id,
            title: value.title,
            note: value.note,
            exercises: value.exercises,
            started_at: value.started_at.to_chrono(),
            finished_at: value.finished_at.to_chrono(),
        }
    }
}

impl From<WorkoutModel> for WorkoutOutput {
    fn from(value: WorkoutModel) -> Self {
        Self {
            _id: value._id.to_hex(),
            user_id: value.user_id.to_hex(),
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
            exercise_id: value.exercise_id.to_hex(),
            note: value.note,
            sets: sets,
        }
    }
}

impl From<WorkoutModelExerciseSet> for WorkoutExerciseSetInput {
    fn from(value: WorkoutModelExerciseSet) -> Self {
        WorkoutExerciseSetInput {
            set_type: value.set_type,
            weight: value.weight,
            reps: value.reps,
            time: value.time,
        }
    }
}
