import mongoose, { Document, Schema } from "mongoose";


export interface HeaalthDashboardData extends Document {
  email: string
  date: Date
  steps: number
  sleep: number
  weight: number
  calories: number
  waterIntake: number
  activeMinutes: number
}


const HeaalthDashboardDataSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  heartRate: { type: Number, required: false },
  steps: { type: Number, required: false },
  sleep: { type: Number, required: false },
  weight: { type: Number, required: false },
  calories: { type: Number, required: false },
  waterIntake: { type: Number, required: false },
  activeMinutes: { type: Number, required: false },
})

export default mongoose.model<HeaalthDashboardData>('HealthDashboardData', HeaalthDashboardDataSchema)
