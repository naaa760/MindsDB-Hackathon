import connectToMindsDB from "./connection";
import MindsDB from 'mindsdb-js-sdk'
import dotenv from 'dotenv'
import { DBParams, DBTypes } from "../types";
dotenv.config()


export async function connectToDataSources(
  db: DBTypes,
  dbName: string,
  connectionParams: DBParams
): Promise<void> {
  try {
    // Create the connection to the specific datasource
    const database = await MindsDB.Databases.createDatabase(
      dbName,
      db,
      connectionParams
    )
    console.log(`Successfully connected to ${db} database: ${dbName}`)
  } catch (error) {
    console.error(`Failed to connect to ${db} databse:`, error);
    throw error;
  }
}
