import { Request, Response } from 'express';
import * as ApartmentService from '../services/apartmentService';
import { successResponse, errorResponse } from '../utils/responseWrapper';
import { HttpException } from '../exceptions/HttpException';
import { CreateApartmentDto } from '../dto/apartment.dto';
import { SearchFilter } from '../enum/SearchFilter';

export const listApartments = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters = {
            [SearchFilter.Search]: req.query[SearchFilter.Search] as string,
            [SearchFilter.Project]: req.query[SearchFilter.Project] as string,
            [SearchFilter.UnitNumber]: req.query[SearchFilter.UnitNumber] as string,
            [SearchFilter.MinPrice]: req.query[SearchFilter.MinPrice]
                ? parseFloat(req.query[SearchFilter.MinPrice] as string)
                : undefined,
            [SearchFilter.MaxPrice]: req.query[SearchFilter.MaxPrice]
                ? parseFloat(req.query[SearchFilter.MaxPrice] as string)
                : undefined,
        };

        const apartments = await ApartmentService.listApartments(filters);
        res.json(successResponse(apartments, 'Apartments fetched'));
    } catch (error) {
        handleControllerError(res, error, 'listApartments');
    }
};

export const getApartment = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const apartment = await ApartmentService.getApartmentById(id);
        res.json(successResponse(apartment, 'Apartment found'));
    } catch (error) {
        handleControllerError(res, error, 'getApartment');
    }
};

export const addApartment = async (req: Request<{}, {}, CreateApartmentDto>, res: Response): Promise<void> => {
    try {
        const apartmentData = req.body;
        const newApartment = await ApartmentService.addNewApartment(apartmentData);
        res.status(201).json(successResponse(newApartment, 'Apartment created'));
    } catch (error) {
        handleControllerError(res, error, 'addApartment');
    }
};

const handleControllerError = (res: Response, error: unknown, context: string): void => {
    console.error(`Error in ${context}:`, error);
    if (error instanceof HttpException) {
        res.status(error.status).json(errorResponse(error.message, error.status));
    } else {
        res.status(500).json(errorResponse('Internal server error'));
    }
};
