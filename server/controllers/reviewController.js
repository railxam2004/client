import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import { Offer } from '../models/offer.js';
import ApiError from '../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const addReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const offerId = req.params.offerId;
        const userId = req.user.id;

        if (!comment || !rating || !offerId) {
            return next(ApiError.badRequest('Не хватает данных для комментария'));
        }

        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return next(ApiError.notFound('Оффер не найден'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId,
        });

        await offer.increment('commentsCount');

        const reviewWithAuthor = await Review.findByPk(review.id, {
            include: { model: User, as: 'author' },
        });

        return res.status(201).json(adaptReviewToClient(reviewWithAuthor));
    } catch (error) {
        next(ApiError.badRequest(`Ошибка при добавлении комментария: ${error.message}`));
    }
};

export const getReviewsByOfferId = async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: { OfferId: req.params.offerId },
            include: { model: User, as: 'author' },
            order: [['publishDate', 'DESC']],
        });

        return res.json(reviews.map(adaptReviewToClient));
    } catch {
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
};
