import mongoose, { Document, Schema, Model } from "mongoose";

export interface HealthDashboardData extends Document {
  user: mongoose.Types.ObjectId;
  email: string;
  date: Date;
  steps: number;
  sleep: number;
  weight: number;
  calories: number;
  waterIntake: number;
  activeMinutes: number;
  createdAt: Date;
}

const HealthDashboardDataSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'HealthPulseUser',
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
});

const HealthDashboardDataModel: Model<HealthDashboardData> = mongoose.model<HealthDashboardData>('HealthDashboardData', HealthDashboardDataSchema);

// Export the Model to use in the application
export default HealthDashboardDataModel;
