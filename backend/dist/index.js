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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongooseConnection_1 = require("./config/mongooseConnection");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var reportsRoute_1 = __importDefault(require("./routes/reportsRoute"));
var dotenv_1 = __importDefault(require("dotenv"));
var healthDashboardData_1 = __importDefault(require("./routes/healthDashboardData"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Configure the Middleware to allow from all origins
var corsOptions = {
    origin: "*", // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use((0, cors_1.default)(corsOptions));
// Connect to MongoDB when the app starts
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, mongooseConnection_1.connectToMongoDB)()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error connecting to MongoDB:', error_1);
                process.exit(1); // Exit the process if the DB connection fails
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
// Swagger configuration options
var swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HealthPulse API',
            version: '1.0.0',
            description: 'API documentation for the HealthPulse project',
            contact: {
                name: 'Halleluyah Oludele',
                email: 'halleluyaholudele@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
            {
                url: 'https://healthpulse-hbaq.onrender.com'
            }
        ],
    },
    apis: ['./routes/*.ts'], // Path to your route files
};
// Initialize swagger-jsdoc
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger API docs on the /api-docs route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Home route to display a message with a link to the API docs
app.get('/', function (req, res) {
    res.send('<h1>Welcome to Health Dashboard API</h1><p>View API documentation at <a href="/api-docs">/api-docs</a></p>');
});
// Define routes
// Route to get the health report
app.use('/api', reportsRoute_1.default);
// Route to get the health dashboard data
app.use('/api', healthDashboardData_1.default);
// Start the server
var server = app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
// Graceful shutdown
var shutdown = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Shutting down server...');
        server.close(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongooseConnection_1.disconnectFromMongoDB)()];
                    case 1:
                        _a.sent();
                        console.log('Server and MongoDB connection closed');
                        process.exit(0); // Exit gracefully
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
// Handle termination signals (e.g., Ctrl+C)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
