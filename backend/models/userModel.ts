import mongoose, { Document, Schema, Model } from "mongoose";

// Define the type for the health report
interface HealthReport {
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
}

// Create an Interface representing the user model in the database
export interface HealthPulseUser extends Document {
  name: string;
  email: string;
  age: number;
  sex: string;
  occupation: string;
  healthData: mongoose.Types.ObjectId[];
  symptoms: string[];
  timeOfYear: string[];
  places: string[];
  healthReports: HealthReport[];
  createdAt: Date;
  updatedAt: Date;
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
    type: String,
    required: true
  },
  occupation: {
    type: String,
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
  timeOfYear: {
    type: [String],
    default: []
  },
  places: {
    type: [String],
    default: []
  },
  healthReports: {
    type: [Schema.Types.Mixed],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

HealthPulseUserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create the Mongoose model
const HealthPulseUserModel: Model<HealthPulseUser> = mongoose.model<HealthPulseUser>('HealthPulseUser', HealthPulseUserSchema);

// Export the model to use in other parts of your app
export default HealthPulseUserModel;
