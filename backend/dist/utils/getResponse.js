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
var apiKey = process.env.UPSTAGE_API_KEY || ""; // Handle null case for apiKey
if (!apiKey) {
    throw new Error("API key is missing. Please ensure it is set in the environment variables.");
}
var client = new openai_1.default({
    apiKey: apiKey,
    baseURL: "https://api.upstage.ai/v1/solar",
});
// Function to generate health report
function generateHealthReport(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var chatCompletion, response, parsedResponse, error_1;
        var name = _b.name, age = _b.age, sex = _b.sex, symptoms = _b.symptoms, location = _b.location, timeOfYear = _b.timeOfYear, occupation = _b.occupation;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client.chat.completions.create({
                            model: "solar-pro",
                            messages: [
                                {
                                    role: "system",
                                    content: "You are a medical health assistant with expertise in analyzing user-provided health information. The user will provide you the following details:\n    1. **Age**: The user's age (as a number).\n    2. **Sex**: The user's sex (Male or Female).\n    3. **Symptoms**: A list of symptoms the user is experiencing.\n    4. **Location**: The user's current location (city, country).\n    5. **Time of Year**: The current season or time of year affecting health conditions.\n    6. **Occupation** (Optional): The user's occupation, which could influence health risks.\n    \n    Based on this information, you will return a detailed health report in **JSON format** with the following fields:\n    \n    - **name**: The user's name.\n    - **age**: The user's age.\n    - **sex**: The user's sex.\n    - **location**: The user's location.\n    - **timeOfYear**: The current time of year or season.\n    - **symptoms**: The list of symptoms provided by the user.\n    - **suspectedDisease**: The most likely disease(s) based on the symptoms.\n    - **pathophysiology**: A brief description of the suspected disease(s)' underlying causes or mechanisms.\n    - **generalHealthStatus**: An assessment of the user's overall health status.\n    - **ageSpecificInsights**: Health considerations specific to the user's age group.\n    - **sexSpecificInsights**: Health considerations specific to the user's sex.\n    - **locationSpecificInsights**: Health considerations based on the user's location.\n    - **seasonalHealthConsiderations**: Health risks or recommendations based on the current time of year.\n    - **educationalSpecificInsights**: Health recommendations or risks based on the user's occupation (if provided).\n    \n    Return **only the JSON response** with these fields. No additional text or formatting is needed.",
                                },
                                {
                                    role: "user",
                                    content: JSON.stringify({
                                        name: name,
                                        age: age,
                                        sex: sex,
                                        symptoms: symptoms,
                                        location: location,
                                        timeOfYear: timeOfYear,
                                        occupation: occupation,
                                    }),
                                }
                            ],
                        })];
                case 1:
                    chatCompletion = _c.sent();
                    response = chatCompletion.choices[0].message.content || "";
                    parsedResponse = JSON.parse(response);
                    return [2 /*return*/, parsedResponse]; // Return the structured health report
                case 2:
                    error_1 = _c.sent();
                    console.error("Error generating health report:", error_1);
                    throw new Error("Failed to generate health report");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = generateHealthReport;
