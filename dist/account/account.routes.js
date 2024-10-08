"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("./account.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/accounts', auth_middleware_1.authenticate, account_controller_1.createAccount);
router.get('/accounts', auth_middleware_1.authenticate, account_controller_1.getAccounts);
router.get('/accounts/:id', auth_middleware_1.authenticate, account_controller_1.getAccountById);
exports.default = router;
