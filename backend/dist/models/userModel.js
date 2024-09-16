"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var HealthPulseUserSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
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
        type: [mongoose_1.Schema.Types.Mixed],
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
});
HealthPulseUserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the Mongoose model
var HealthPulseUserModel = mongoose_1.default.model('HealthPulseUser', HealthPulseUserSchema);
// Export the model to use in other parts of your app
exports.default = HealthPulseUserModel;
