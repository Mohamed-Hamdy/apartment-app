import { Router } from 'express';
import { listApartments, getApartment, addApartment } from '../controllers/apartmentController';

const router = Router();

router.get('/', listApartments);
router.get('/get/:id', getApartment);
router.post('/add/', addApartment);

export default router;
