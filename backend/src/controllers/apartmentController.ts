import { Request, Response } from 'express';
import Apartment from '../models/Apartment';

/**
 * GET /apartments?unitName=...&unitNumber=...&project=...
 */
export const listApartments = async (req: Request, res: Response): Promise<void> => {
    const { unitName, unitNumber, project } = req.query;

    const where: any = {};

    if (unitName) where.unitName = unitName;
    if (unitNumber) where.unitNumber = unitNumber;
    if (project) where.project = project;

    const apartments = await Apartment.findAll({ where });
    res.json(apartments);
};

/**
 * GET /apartments/:id
 */
export const getApartment = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const id = req.params.id;
    const apartment = await Apartment.findByPk(id);

    if (!apartment) {
        res.status(404).json({ error: 'Apartment not found' });
        return;
    }

    res.json(apartment);
};

/**
 * POST /apartments
 */
export const addApartment = async (req: Request, res: Response): Promise<void> => {
    const { unitName, unitNumber, project, description, price, imageUrl } = req.body;

    if (!unitName || !unitNumber || !project || !price) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const newApartment = await Apartment.create({
        unitName,
        unitNumber,
        project,
        description,
        price,
        imageUrl,
    });

    res.status(201).json(newApartment);
};
