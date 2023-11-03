use mongodb::bson::oid::ObjectId;

#[derive(serde::Serialize)]
pub struct WorkoutModelExerciseSet {
    pub set_type: SetType,
    pub weight: i32,
    pub reps: i32,
    // Time in seconds
    pub time: u32,
}

#[derive(serde::Serialize)]
pub struct WorkoutModelExercise {
    pub exercise_id: ObjectId,
    pub note: String,
    pub sets: Vec<WorkoutModelExerciseSet>,
}

#[derive(serde::Serialize)]
pub struct WorkoutModel {
    pub _id: ObjectId,
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

#[derive(serde::Deserialize)]
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
