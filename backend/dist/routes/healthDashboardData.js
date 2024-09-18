"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var healthDashboardDataModel_1 = __importDefault(require("../models/healthDashboardDataModel"));
var userModel_1 = __importDefault(require("../models/userModel"));
var healthDashboardRouter = (0, express_1.Router)();
// Optimize POST route for adding health dashboard data
healthDashboardRouter.post('/dashboard-details', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, date, steps, sleep, weight, calories, waterIntake, activeMinutes, userPromise, user, healthData, error_1, typedError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, date = _a.date, steps = _a.steps, sleep = _a.sleep, weight = _a.weight, calories = _a.calories, waterIntake = _a.waterIntake, activeMinutes = _a.activeMinutes;
                if (!email || !date || !steps || !sleep || !weight || !calories || !waterIntake || !activeMinutes) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing required fields' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                userPromise = userModel_1.default.findOne({ email: email }).exec();
                return [4 /*yield*/, userPromise];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                healthData = new healthDashboardDataModel_1.default({
                    user: user._id,
                    email: email,
                    date: new Date(),
                    steps: steps,
                    sleep: sleep,
                    weight: weight,
                    calories: calories,
                    waterIntake: waterIntake,
                    activeMinutes: activeMinutes,
                });
                // Save the document
                return [4 /*yield*/, healthData.save()];
            case 3:
                // Save the document
                _b.sent();
                console.log('Added the health dashboard data');
                return [2 /*return*/, res.status(201).json({ message: 'Health data added successfully' })];
            case 4:
                error_1 = _b.sent();
                if (!res.headersSent) {
                    typedError = error_1;
                    res.status(500).json({ error: typedError.message });
                }
                console.error('Could not add the health dashboard data', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Optimize GET route for fetching health dashboard data
healthDashboardRouter.get('/dashboard-details', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, healthData, error_2, typedError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                if (typeof email !== 'string') {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid or missing email in query parameter' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, healthDashboardDataModel_1.default.find({ email: email })
                        .sort({ createdAt: -1 })
                        .lean()
                        .exec()];
            case 2:
                healthData = _a.sent();
                if (!healthData.length) {
                    return [2 /*return*/, res.status(404).json({ error: 'Health Data not found' })];
                }
                res.json(healthData);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                if (!res.headersSent) {
                    typedError = error_2;
                    res.status(500).json({ error: typedError.message });
                }
                console.error('Error retrieving the HealthData', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = healthDashboardRouter;
