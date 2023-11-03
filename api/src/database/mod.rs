use dotenv::dotenv;
use mongodb::options::ClientOptions;

pub async fn setup_database_client() -> Result<mongodb::Client, Box<dyn std::error::Error>> {
    let uri = dotenv::var("DATABASE_URI").expect("DATABASE_URI env to be set");

    let database_name = dotenv::var("DATABASE_NAME").expect("DATABASE_NAME env to be set");

    let mut options = ClientOptions::parse(uri)
        .await
        .expect("it to be a valid uri");

    options.default_database = Some(database_name);

    mongodb::Client::with_options(options).await
}
