import { Router } from 'express';
import offerRouter from './offerRoutes.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import userRotes from './userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = new Router();

const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'static')));

router.use('/', offerRouter);
router.use('/', userRotes);
router.use('/comments', reviewRouter);

export { router };

// Обработка ошибок, последний Middleware
app.use(errorHandler);
