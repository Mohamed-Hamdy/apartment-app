import { WhereOptions } from 'sequelize';
import Apartment from "../models/Apartment";

// Find all apartments
export const findAllApartments = async (filters: WhereOptions) => {
    return Apartment.findAll({ where: filters });
};

// Find apartment by ID
export const findApartmentById = async (id: string) => {
    return Apartment.findByPk(id);
};

// Create new apartment
export const createApartment = async (data: any) => {
    return Apartment.create(data);
};
