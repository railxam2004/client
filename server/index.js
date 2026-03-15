import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import { router } from './routes/index.js';
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js'; // Задание 2
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
// Раздача статики (чтобы картинки открывались в браузере)
app.use('/static', express.static(path.resolve(__dirname, 'static'))); 
app.use('/', router);

// Обработчик ошибок ДОЛЖЕН БЫТЬ В САМОМ КОНЦЕ, перед start()
app.use(errorMiddleware); 

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();