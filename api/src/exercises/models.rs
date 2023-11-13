use mongodb::bson::oid::ObjectId;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum ExerciseType {
    Weight = 0,
    Time = 1,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct ExerciseModel {
    pub _id: ObjectId,
    pub title: String,
    pub description: String,
    pub exercise_type: ExerciseType,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct ExerciseOutput {
    pub _id: String,
    pub title: String,
    pub description: String,
    pub exercise_type: ExerciseType,
}

impl From<ExerciseModel> for ExerciseOutput {
    fn from(value: ExerciseModel) -> Self {
        Self {
            _id: value._id.to_hex(),
            title: value.title,
            description: value.description,
            exercise_type: value.exercise_type,
        }
    }
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct ExerciseModelWithoutId {
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
