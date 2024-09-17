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
var HealthReportSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
var HealthReportModel = mongoose_1.default.model('HealthReport', HealthReportSchema);
// Export the model
exports.default = HealthReportModel;
