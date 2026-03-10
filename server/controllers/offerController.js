import { Offer } from '../models/offer.js';
import { User } from '../models/user.js'; // Нужно для подгрузки автора
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = req.body;

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;
        
        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',');
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium: isPremium === 'true',
            isFavorite: isFavorite === 'true',
            rating,
            type,
            rooms,
            guests,
            price,
            features: parsedFeatures,
            commentsCount: commentsCount || 0,
            latitude,
            longitude,
            authorId: userId // Тут важно: передаем ID того пользователя, которого мы создали в БД
        });

        return res.status(201).json(offer);
    } catch (error) {
        next(ApiError.internal(`Не удалось добавить предложение: ${error.message}`));
    }
}

export async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

// Задание 6: Самостоятельная реализация getFullOffer
export async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params; // 1. Извлекаем ID
        
        // 2 и 3. Ищем по ID с подгрузкой автора
        const offer = await Offer.findByPk(id, {
            include: { model: User, as: 'author' }
        });

        // 4. Проверка на существование
        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        // 5. Пропускаем через адаптер
        const fullOffer = adaptFullOfferToClient(offer, offer.author);
        
        // 6. Возвращаем клиенту
        return res.status(200).json(fullOffer);
    } catch (error) {
        // 7. Проброс ошибки
        next(ApiError.internal(`Ошибка при получении оффера: ${error.message}`));
    }
}

// Функция из самостоятельного задания 2.1
export const getFavoriteOffers = async (req, res, next) => {
    try {
        const offers = await Offer.findAll({ where: { isFavorite: true } });
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Ошибка при получении избранных предложений'));
    }
};

export const toggleFavorite = async (req, res, next) => {
    try {
        const { offerId, status } = req.params;
        const offer = await Offer.findByPk(offerId);

        if (!offer) {
            return next(ApiError.notFound('Предложение не найдено'));
        }

        offer.isFavorite = status == '1';
        await offer.save();
        res.json(offer);
    } catch (error) {
        next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
};