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
exports.getAccountById = exports.getAccounts = exports.createAccount = void 0;
const account_model_1 = __importDefault(require("./account.model"));
const sequelize_1 = require("sequelize");
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, account_name, bank_name, account_number, currency } = req.body;
        const user = req.user;
        // Check for user authentication
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Validate the 'type' against the allowed enum values
        const allowedTypes = ['asset', 'liability'];
        if (!allowedTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid account type. Must be "asset" or "liability".' });
        }
        // Create the account
        const account = yield account_model_1.default.create({
            type,
            account_name,
            bank_name,
            account_number,
            currency,
            userId: user.id
        });
        // Respond with success
        res.status(201).json({ message: 'Account created successfully', account });
    }
    catch (error) {
        // Handle validation errors
        if (error instanceof sequelize_1.ValidationError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: 'Validation error', details: errorMessages });
        }
        // Handle other errors
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred while creating the account', details: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.createAccount = createAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield account_model_1.default.findAll({ where: { userId: req.user.id } });
        res.json({ accounts });
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred while retrieving accounts', details: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getAccounts = getAccounts;
const getAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        // Check for user authentication
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Find the account by ID and ensure it belongs to the user
        const account = yield account_model_1.default.findOne({ where: { id, userId: user.id } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json({ account });
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred while retrieving the account', details: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getAccountById = getAccountById;
