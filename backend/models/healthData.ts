import mongoose, { Document, Schema, Model } from "mongoose";

export interface HeaalthDashboardData extends Document {
  email: string
  date: Date
  steps: number
  sleep: number
  weight: number
  calories: number
  waterIntake: number
  activeMinutes: number
  createdAt: Date
  updatedAt: Date
}


const HeaalthDashboardDataSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  heartRate: {
    type: Number,
    required: false
  },
  steps: {
    type: Number,
    required: false
  },
  sleep: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  calories: {
    type: Number,
    required: false
  },
  waterIntake: {
    type: Number,
    required: false
  },
  activeMinutes: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

HeaalthDashboardDataSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const HeaalthDashboardDataModel: Model<HeaalthDashboardData> = mongoose.model<HeaalthDashboardData>('HeaalthDashboardData', HeaalthDashboardDataSchema)

// Export the Model to use in the application
export default HeaalthDashboardDataModel;
