use std::str::FromStr;

use axum::{
    extract::{Path, State},
    Json,
};
use mongodb::{bson::doc, Client};

use super::models::{UpdateUserInput, UserModel, UserModelWithoutId};

pub fn get_collection(database: mongodb::Client) -> mongodb::Collection<UserModelWithoutId> {
    database
        .database("strongr")
        .collection::<UserModelWithoutId>("users")
}

pub async fn get_user_by_id(State(database): State<mongodb::Client>, user_id: Path<String>) {
    let collection = get_collection(database);

    match collection
        .find_one(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            None,
        )
        .await
    {
        Ok(result) => println!("{:?}", result),
        Err(err) => eprintln!("{err}"),
    }
}

pub async fn create_user(
    State(database): State<mongodb::Client>,
    Json(payload): Json<UpdateUserInput>,
) {
    let collection = get_collection(database);

    if let Err(err) = collection
        .insert_one(
            UserModelWithoutId {
                first_name: payload.first_name,
                last_name: payload.last_name,
            },
            None,
        )
        .await
    {
        eprintln!("{err}");
    }
}

pub async fn update_user_by_id(
    State(database): State<mongodb::Client>,
    user_id: Path<String>,
    Json(payload): Json<UpdateUserInput>,
) {
    let collection = get_collection(database);

    match collection
        .find_one_and_update(
            doc! {"_id": mongodb::bson::oid::ObjectId::from_str(&user_id.to_string()).unwrap()},
            doc! {"$set": {"first_name": payload.first_name, "last_name": payload.last_name}},
            None,
        )
        .await
    {
        Ok(_) => {}
        Err(err) => eprintln!("{err}"),
    }
}
