import { Router } from 'express';
import { registration } from '../controllers/userController.js';
import upload from '../middleware/upload.js'; // Импорт multer

const router = new Router();

// 'avatar' — это имя поля в форме (form-data), где лежит картинка
router.post('/registration', upload.single('avatar'), registration);
router.post('/login', login);
router.get('/login', authenticateToken, checkAuth);
router.delete('/logout', logout);

export default router;

