"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database has been established successfully.');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };
// // Only start the server if not in a serverless environment
// if (process.env.NODE_ENV !== 'production') {
//   startServer();
// }
exports.handler = (0, serverless_http_1.default)(app_1.default);
