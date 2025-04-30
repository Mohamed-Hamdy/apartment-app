import * as ApartmentDao from '../dao/apartmentDao';
import { CreateApartmentDto } from '../dto/apartment.dto';
import { HttpException } from '../exceptions/HttpException';

export const listApartments = async (query: any) => {
    const filters: any = {};
    if (query.unitName) filters.unitName = query.unitName;
    if (query.unitNumber) filters.unitNumber = query.unitNumber;
    if (query.project) filters.project = query.project;

    return ApartmentDao.findAllApartments(filters);
};

export const getApartmentById = async (id: string) => {
    const apartment = await ApartmentDao.findApartmentById(id);
    if (!apartment) {
        throw new HttpException(404, 'Apartment not found');
    }
    return apartment;
};

export const addNewApartment = async (data: CreateApartmentDto) => {
    const { unitName, unitNumber, project, price } = data;

    if (!unitName || !unitNumber || !project || price == null) {
        throw new HttpException(400, 'Missing required fields');
    }

    return ApartmentDao.createApartment(data);
};
