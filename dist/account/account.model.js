"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_model_1 = __importDefault(require("../auth/user.model"));
class Account extends sequelize_1.Model {
}
Account.init({
    type: {
        type: sequelize_1.DataTypes.ENUM('asset', 'liability'),
        allowNull: false,
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bank_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Account',
});
Account.belongsTo(user_model_1.default, { foreignKey: 'userId' });
user_model_1.default.hasMany(Account, { foreignKey: 'userId' });
exports.default = Account;
