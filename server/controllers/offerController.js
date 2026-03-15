import { Offer } from '../models/offer.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId,
        } = req.body;

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;
        const processedPhotos = req.files?.photos
            ? req.files.photos.map((file) => `/static/${file.filename}`)
            : [];

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = String(features).split(',').map((feature) => feature.trim());
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium: isPremium === 'true' || isPremium === true,
            isFavorite: isFavorite === 'true' || isFavorite === true,
            rating,
            type,
            rooms,
            guests,
            price,
            features: parsedFeatures,
            commentsCount: commentsCount || 0,
            latitude,
            longitude,
            authorId: userId,
        });

        return res.status(201).json(adaptOfferToClient(offer));
    } catch (error) {
        next(ApiError.internal(`Не удалось добавить предложение: ${error.message}`));
    }
}

export async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        return res.status(200).json(offers.map(adaptOfferToClient));
    } catch {
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

export async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: { model: User, as: 'author' },
        });

        if (!offer || !offer.author) {
            return next(ApiError.notFound('Offer not found'));
        }

        return res.status(200).json(adaptFullOfferToClient(offer, offer.author));
    } catch (error) {
        next(ApiError.internal(`Ошибка при получении оффера: ${error.message}`));
    }
}

export const getFavoriteOffers = async (_req, res, next) => {
    try {
        const offers = await Offer.findAll({ where: { isFavorite: true } });
        return res.json(offers.map(adaptOfferToClient));
    } catch {
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

        offer.isFavorite = status === '1';
        await offer.save();

        return res.json(adaptOfferToClient(offer));
    } catch {
        next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
};
