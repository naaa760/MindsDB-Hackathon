"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var HeaalthDashboardDataSchema = new mongoose_1.default.Schema({
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
});
HeaalthDashboardDataSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
var HeaalthDashboardDataModel = mongoose_1.default.model('HeaalthDashboardData', HeaalthDashboardDataSchema);
// Export the Model to use in the application
exports.default = HeaalthDashboardDataModel;
