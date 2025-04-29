import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Apartment extends Model {}

Apartment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    unitName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unitNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Apartment',
    tableName: 'apartments',
    timestamps: true,
});

export default Apartment;
