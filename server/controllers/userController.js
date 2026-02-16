import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import { User } from '../models/models.js'; // Проверьте путь к модели User! В задании написано '../models/user.js', но обычно они в models.js

export const registration = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        
        // Проверка наличия файла, чтобы не упало с ошибкой
        const avatarImage = req.file ? `/static/${req.file.filename}` : null; 

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            type: userType, // Внимательно: в коде задания userType, в модели часто поле называется просто type или role. Проверьте модель!
            name: username, // Тоже проверьте поле: username или name
            avatar: avatarImage,
            password: hashPassword
        });

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.name, // или user.username
                avatarUrl: user.avatar,
                isPro: user.type === 'pro'
            }
        });
    } catch (error) {
        next(ApiError.internal('Ошибка регистрации: ' + error.message));
    }
};