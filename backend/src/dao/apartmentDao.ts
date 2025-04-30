import Apartment from '../models/Apartment';

export const findAllApartments = async (filters: any) => {
    return Apartment.findAll({ where: filters });
};

export const findApartmentById = async (id: string) => {
    return Apartment.findByPk(id);
};

export const createApartment = async (data: any) => {
    return Apartment.create(data);
};
