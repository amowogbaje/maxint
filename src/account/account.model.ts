import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from '../auth/user.model';

class Account extends Model {
  public id!: number;
  public type!: 'asset' | 'liability'; // Updated to be an enum type
  public account_name!: string;
  public bank_name!: string;
  public account_number!: string;
  public currency!: string;
  public userId!: number;
}

Account.init({
  type: {
    type: DataTypes.ENUM('asset', 'liability'),
    allowNull: false,
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Account',
});

Account.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Account, { foreignKey: 'userId' });

export default Account;
