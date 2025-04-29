import { Router } from 'express';
import { listApartments, getApartment, addApartment } from '../controllers/apartmentController';

const router = Router();

router.get('/', listApartments);
router.get('/:id', getApartment);
router.post('/addApartment', addApartment);

export default router;
