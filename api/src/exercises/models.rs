use mongodb::bson::oid::ObjectId;

pub enum ExerciseType {
    Weight = 0,
    Time = 1,
}

#[derive(serde::Serialize)]
pub struct ExerciseModel {
    pub _id: ObjectId,
    pub title: String,
    pub description: String,
    pub exercise_type: ExerciseType,
}

#[derive(serde::Deserialize)]
pub struct CreateExerciseInput {
    pub title: String,
    pub description: String,
    pub exercise_type: ExerciseType,
}

#[derive(serde::Deserialize)]
pub struct UpdateExerciseInput {
    pub title: String,
    pub description: String,
    pub exercise_type: ExerciseType,
}
