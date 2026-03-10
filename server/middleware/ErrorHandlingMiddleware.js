import ApiError from '../error/ApiError.js';

export default function (err, req, res, next) {
    // ДОБАВЬ ЭТУ СТРОКУ, чтобы увидеть реальную ошибку в терминале nodemon
    console.error('ПОЙМАНА ОШИБКА:', err); 

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка!' });
}