import { Request, Response } from 'express';
import * as ApartmentService from '../services/apartmentService';
import { successResponse, errorResponse } from '../utils/responseWrapper';
import { HttpException } from '../exceptions/HttpException';
import { CreateApartmentDto } from '../dto/apartment.dto';

export const listApartments = async (req: Request, res: Response): Promise<void> => {
    try {
        const apartments = await ApartmentService.listApartments(req.query);
        res.json(successResponse(apartments, 'Apartments fetched'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
};

export const getApartment = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const apartment = await ApartmentService.getApartmentById(req.params.id);
        res.json(successResponse(apartment, 'Apartment found'));
    } catch (error) {
        if (error instanceof HttpException) {
            res.status(error.status).json(errorResponse(error.message, error.status));
        } else {
            res.status(500).json(errorResponse('Internal server error'));
        }
    }
};

export const addApartment = async (req: Request<{}, {}, CreateApartmentDto>, res: Response): Promise<void> => {
    try {
        const newApartment = await ApartmentService.addNewApartment(req.body);
        res.status(201).json(successResponse(newApartment, 'Apartment created'));
    } catch (error) {
        if (error instanceof HttpException) {
            res.status(error.status).json(errorResponse(error.message, error.status));
        } else {
            res.status(500).json(errorResponse('Internal server error'));
        }
    }
};
