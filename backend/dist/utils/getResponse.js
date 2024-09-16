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
var openai_1 = __importDefault(require("openai"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var apiKey = process.env.UPSTAGE_API_KEY;
var client = new openai_1.default({
    apiKey: apiKey,
    baseURL: 'https://api.upstage.ai/v1/solar'
});
// Async function to generate health report
var generateHealthReport = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var assistant, thread, message, handleRequiresAction, handleRunStatus, run, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.beta.assistants.create({
                    model: "solar-pro",
                    instructions: "You are a health assistant bot. Use the provided functions to gather information and construct a detailed health report.",
                    tools: [
                        {
                            type: "function",
                            function: {
                                name: "getSuspectedDisease",
                                description: "Get the suspected disease based on symptoms, age, sex, location, and time of year.",
                                parameters: {
                                    type: "object",
                                    properties: {
                                        symptoms: {
                                            type: "array",
                                            items: { type: "string" },
                                            description: "List of symptoms experienced by the patient.",
                                        },
                                        age: { type: "integer", description: "Age of the patient." },
                                        sex: { type: "string", enum: ["Male", "Female"], description: "Sex of the patient." },
                                        location: { type: "string", description: "Current location of the patient." },
                                        timeOfYear: { type: "string", description: "Time of the year (e.g., Spring, Summer, Fall, Winter)." },
                                    },
                                    required: ["symptoms", "age", "sex", "location", "timeOfYear"],
                                    additionalProperties: false,
                                },
                                strict: true,
                            },
                        },
                        // Add other tool definitions here
                    ],
                })];
            case 1:
                assistant = _a.sent();
                return [4 /*yield*/, client.beta.threads.create()];
            case 2:
                thread = _a.sent();
                return [4 /*yield*/, client.beta.threads.messages.create(thread.id, {
                        role: 'user',
                        content: JSON.stringify({
                            prompt: "Using the following data, generate a health report:\n        Age: ".concat(params.age, "\n        Sex: ").concat(params.sex, "\n        Symptoms: ").concat(params.symptoms.join(", "), "\n        Location: ").concat(params.location, "\n        Time of Year: ").concat(params.timeOfYear, "\n        Occupation: ").concat(params.occupation || 'Not provided'),
                        }),
                    })];
            case 3:
                message = _a.sent();
                handleRequiresAction = function (run) { return __awaiter(void 0, void 0, void 0, function () {
                    var toolCalls, toolOutputs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(run.required_action &&
                                    run.required_action.submit_tool_outputs &&
                                    run.required_action.submit_tool_outputs.tool_calls)) return [3 /*break*/, 5];
                                toolCalls = run.required_action.submit_tool_outputs.tool_calls;
                                toolOutputs = toolCalls.map(function (tool) {
                                    // Example of how to handle specific tool names and generate outputs
                                    if (tool.function.name === "getSuspectedDisease") {
                                        return {
                                            tool_call_id: tool.id,
                                            output: JSON.stringify({
                                                suspectedDisease: "Example Disease", // Replace with actual value
                                            }),
                                        };
                                    }
                                    // Add handling for other tools here if necessary
                                    return null;
                                }).filter(function (output) { return output !== null; });
                                if (!(toolOutputs.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
                                        tool_outputs: toolOutputs,
                                    })];
                            case 1:
                                run = _a.sent();
                                console.log("Tool outputs submitted successfully.");
                                return [3 /*break*/, 3];
                            case 2:
                                console.log("No tool outputs to submit.");
                                _a.label = 3;
                            case 3: return [4 /*yield*/, handleRunStatus(run)];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                handleRunStatus = function (run) { return __awaiter(void 0, void 0, void 0, function () {
                    var messages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(run.status === "completed")) return [3 /*break*/, 2];
                                return [4 /*yield*/, client.beta.threads.messages.list(thread.id)];
                            case 1:
                                messages = _a.sent();
                                console.log(messages.data);
                                return [2 /*return*/, messages.data];
                            case 2:
                                if (!(run.status === "requires_action")) return [3 /*break*/, 4];
                                console.log(run.status);
                                return [4 /*yield*/, handleRequiresAction(run)];
                            case 3: return [2 /*return*/, _a.sent()];
                            case 4:
                                console.error("Run did not complete:", run);
                                throw new Error("Run did not complete successfully.");
                        }
                    });
                }); };
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                return [4 /*yield*/, client.beta.threads.runs.createAndPoll(thread.id, {
                        assistant_id: assistant.id,
                    })];
            case 5:
                run = _a.sent();
                return [4 /*yield*/, handleRunStatus(run)];
            case 6: return [2 /*return*/, _a.sent()];
            case 7:
                error_1 = _a.sent();
                console.error("An error occurred:", error_1);
                throw error_1;
            case 8: return [2 /*return*/];
        }
    });
}); };
// Example usage
//const exampleParams: AssistantParams = {
//  age: 30,
//  sex: 'Female',
//  symptoms: ['fever', 'headache'],
//  location: 'New York',
//  timeOfYear: 'Fall',
//  occupation: 'Teacher',
//};
//
//generateHealthReport(exampleParams).then(result => {
//  console.log("Health report result:", result);
//}).catch(error => {
//  console.error("Failed to generate health report:", error);
//});
exports.default = generateHealthReport;
