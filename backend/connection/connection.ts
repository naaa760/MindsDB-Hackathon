import MindsDB from 'mindsdb-js-sdk'
import { Model, ModelPrediction, Project, Table, View } from 'mindsdb-js-sdk'

interface ConnectionParams {
  user: string
  password: string
}

const connectToMindsDB = async ({ user, password }: ConnectionParams): Promise<void> => {
  try {
    await MindsDB.connect({
      user,
      password
    })
    console.log('Successfully connected to MindsDB')
  } catch (error) {
    console.error('Failed to authenticate: ', error)
    throw error
  }
}

export default connectToMindsDB
