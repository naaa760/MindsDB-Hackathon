import mongoose, { Document, Schema, Model } from "mongoose";

// Define the type for the health report
export interface HealthReport extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  age: number;
  sex: string;
  location: string;
  timeOfYear: string;
  symptoms: string[];
  suspectedDisease: string;
  pathophysiology: string;
  generalHealthStatus: string;
  ageSpecificInsights: string;
  sexSpecificInsights: string;
  locationSpecificInsights: string;
  seasonalHealthConsiderations: string;
  educationalSpecificInsights: string;
  dateAdded: Date;
}

const HealthReportSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'HealthPulseUser',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timeOfYear: {
    type: String,
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  suspectedDisease: {
    type: String,
    required: true
  },
  pathophysiology: {
    type: String,
    required: true
  },
  generalHealthStatus: {
    type: String,
    required: true
  },
  ageSpecificInsights: {
    type: String,
    required: true
  },
  sexSpecificInsights: {
    type: String,
    required: true
  },
  locationSpecificInsights: {
    type: String,
    required: true
  },
  seasonalHealthConsiderations: {
    type: String,
    required: true
  },
  educationalSpecificInsights: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
});

const HealthReportModel: Model<HealthReport> = mongoose.model<HealthReport>('HealthReport', HealthReportSchema);

// Export the model
export default HealthReportModel;
