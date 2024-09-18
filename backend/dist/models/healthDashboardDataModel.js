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
var HealthDashboardDataSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
var HealthDashboardDataModel = mongoose_1.default.model('HealthDashboardData', HealthDashboardDataSchema);
// Export the Model to use in the application
exports.default = HealthDashboardDataModel;
