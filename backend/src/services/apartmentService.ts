import * as ApartmentDao from '../dao/apartmentDao';
import { CreateApartmentDto } from '../dto/apartment.dto';
import { HttpException } from '../exceptions/HttpException';
import { Op, WhereOptions } from 'sequelize';

export const listApartments = async (query: any) => {
  const filters = buildApartmentFilters(query);
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

const buildApartmentFilters = (query: any): WhereOptions => {
  const filters: any = {};

  if (query.search) {
    filters[Op.or] = [
      { unitName: { [Op.like]: `%${query.search}%` } },
      { unitNumber: { [Op.like]: `%${query.search}%` } },
      { project: { [Op.like]: `%${query.search}%` } },
      { description: { [Op.like]: `%${query.search}%` } },
    ];
  }

  if (query.project) {
    filters.project = { [Op.like]: `%${query.project}%` };
  }

  if (query.unitNumber) {
    filters.unitNumber = { [Op.like]: `%${query.unitNumber}%` };
  }

  if (query.minPrice != null || query.maxPrice != null) {
    filters.price = {};
    if (query.minPrice != null) filters.price[Op.gte] = query.minPrice;
    if (query.maxPrice != null) filters.price[Op.lte] = query.maxPrice;
  }

  return filters;
};
