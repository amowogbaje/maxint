"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const account_routes_1 = __importDefault(require("./account/account.routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api', account_routes_1.default);
app.get("/", (req, res) => {
    return res.json({
        "message": "Welcome to the Account Feature API",
        "status": res.statusCode,
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!', details: err.message });
});
exports.default = app;
