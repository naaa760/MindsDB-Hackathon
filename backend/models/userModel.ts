import mongoose, { Document, Schema } from "mongoose";

// Create an Interface representing the user model  in the database
export interface HealthPulseUser extends Document {
  name: string
  email: string
  age: number
  sex: string
  occupation: string
  healthData: mongoose.Types.ObjectId[]
  symptoms: string[]
  timeOfyear: string[]
  place: string[]
  createdAt: Date
  updatedAt: Date
}

const HealthPulseUserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: Number,
    required: true
  },
  occupation: {
    type: Number,
    required: true
  },
  healthData: [
    {
      type: Schema.Types.ObjectId,
      ref: 'HealthDashboardData'
    }
  ],
  symptoms: {
    type: [String],
    default: []
  },
  timeOfyear: {
    type: [String],
    default: []
  },
  places: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
})

HealthPulseUserSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.model<HealthPulseUser>('HealthPulseUser', HealthPulseUserSchema)
