import { Router } from 'express';
import { getAllOffers, createOffer, getFullOffer } from '../controllers/offerController.js'; // Добавили getFullOffer
import upload from '../middleware/upload.js';

const router = new Router();

router.get('/offers', getAllOffers);
router.get('/offers/:id', getFullOffer); // Новый маршрут

router.post('/offers', upload.fields([
  { name: 'previewImage', maxCount: 1 },
  { name: 'photos', maxCount: 6 }
]), createOffer);

export default router;