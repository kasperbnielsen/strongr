use mongodb::bson::oid::ObjectId;

#[derive(serde::Serialize)]
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
