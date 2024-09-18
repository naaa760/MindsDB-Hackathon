import mongoose, { Document, Schema, Model } from "mongoose";

// Create an Interface representing the user model in the database
export interface HealthPulseUser extends Document {
  name: string;
  email: string;
  age: number;
  sex: string;
  occupation: string;
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

const HealthPulseUserModel: Model<HealthPulseUser> = mongoose.model<HealthPulseUser>('HealthPulseUser', HealthPulseUserSchema);

// Export the model to use in other parts of your app
export default HealthPulseUserModel;
