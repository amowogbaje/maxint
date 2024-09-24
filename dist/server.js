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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app")); // Your Express app
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('Connection to the database has been established successfully.');
        // Start the server only when not running in a serverless environment
        if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
            app_1.default.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
// Define the serverless handler
exports.handler = (0, serverless_http_1.default)(app_1.default);
// Start the server for local development
startServer();
