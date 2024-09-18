import os
from minds.client import Client
from minds.datasources import DatabaseConfig
from dotenv import load_dotenv

load_dotenv()

minds_api_key = os.getenv("MINDSDB_API_KEY", "https://mdb.ai/")

client = Client(minds_api_key)


mongodb_config = DatabaseConfig(
    name="healthdashboard_model",
    description="This containst the wearable device data of different individuals and when it was collected. This can be used to predict the tends of the person's health based on the data that is in the database",
    engine="mongodb",
    connection_data={"host": os.getenv("MONGO_URI"), "database": "test"},
    tables=["healthdashboarddatas"],
)

datasource = client.datasources.create(mongodb_config, replace=True)

mind = client.minds.create(name="my_mind", datasources=[datasource], replace=True)

print(
    f"{mind.name} was created successfully. You can now use this Mind using the OpenAI-compatible API, see docs for next steps."
)
