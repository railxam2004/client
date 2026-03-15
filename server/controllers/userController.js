import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';

const createToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

const makeUserResponse = (user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    isPro: user.userType === 'pro',
    token: createToken(user),
});

export const registration = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body;

        if (!email || !password || !userType || !username) {
            return next(ApiError.badRequest('Не хватает данных для регистрации'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const avatarImage = req.file ? `/static/${req.file.filename}` : null;
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            userType,
            username,
            avatar: avatarImage,
            password: hashPassword,
        });

        return res.status(201).json(makeUserResponse(user));
    } catch (error) {
        next(ApiError.internal(`Ошибка регистрации: ${error.message}`));
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return next(ApiError.badRequest('Неверный пароль'));
        }

        return res.json(makeUserResponse(user));
    } catch (error) {
        next(ApiError.internal(`Ошибка авторизации: ${error.message}`));
    }
};

export const checkAuth = (req, res) => res.json(makeUserResponse(req.user));

export const logout = (_req, res) => {
    res.status(204).send();
};
