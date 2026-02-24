import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const addReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const { offerId } = req.params;
    const userId = req.user.id; // Получим из токена позже
    
    // В условии лабы опечатка, исправил на корректную проверку
    if (!comment || !rating || !offerId) {
      return next(ApiError.badRequest('Не хватает данных для комментария'));
    }
    
    const review = await Review.create({
      text: comment,
      rating: rating,
      authorId: userId,
      offerId: offerId // Используем маленькую букву как в твоей модели
    });
    
    res.status(201).json(review);
  } catch (error) {
    next(ApiError.badRequest('Ошибка при добавлении комментария: ' + error.message));
  }
};

export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { offerId: req.params.offerId },
      include: { model: User, as: 'author' },
      order: [['publishDate', 'DESC']]
    });
    
    const adaptedReviews = reviews.map(adaptReviewToClient);
    res.json(adaptedReviews);
  } catch (error) {
    next(ApiError.internal('Ошибка при получении комментариев'));
  }
};