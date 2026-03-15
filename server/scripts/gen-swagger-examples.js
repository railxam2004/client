import fs from 'fs';
import YAML from 'yaml';
import { faker } from '@faker-js/faker';

const SWAGGER_PATH = 'docs/swagger.yaml';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const OFFER_TYPES = ['apartment', 'house', 'room', 'hotel'];
const FEATURES = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

function genLoginExample() {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
  };
}

function genRegisterExample() {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    userType: faker.helpers.arrayElement(['normal', 'pro']),
    username: faker.internet.username().slice(0, 15),
  };
}

function genOfferExample() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    publishDate: faker.date.recent().toISOString().slice(0, 10),
    city: faker.helpers.arrayElement(CITIES),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    type: faker.helpers.arrayElement(OFFER_TYPES),
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 8 }),
    price: faker.number.int({ min: 100, max: 500 }),
    features: JSON.stringify(faker.helpers.arrayElements(FEATURES, { min: 2, max: 5 })),
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
  };
}

function genReviewExample() {
  return {
    comment: faker.lorem.sentence(12),
    rating: faker.number.int({ min: 1, max: 5 }),
  };
}

function ensureContent(doc, pathName, method, contentType) {
  return doc?.paths?.[pathName]?.[method]?.requestBody?.content?.[contentType] || null;
}

const raw = fs.readFileSync(SWAGGER_PATH, 'utf-8');
const doc = YAML.parse(raw);

const loginContent = ensureContent(doc, '/login', 'post', 'application/json');
if (!loginContent) {
  console.error('Не найден /login POST requestBody content application/json — проверь swagger.yaml');
  process.exit(1);
}
loginContent.example = genLoginExample();

const registerContent = ensureContent(doc, '/register', 'post', 'multipart/form-data');
if (registerContent) {
  registerContent.examples = {
    generated: {
      summary: 'Сгенерированный пример (только текстовые поля)',
      value: genRegisterExample(),
    },
  };
}

const offerContent = ensureContent(doc, '/offers', 'post', 'multipart/form-data');
if (offerContent) {
  offerContent.examples = {
    generated: {
      summary: 'Сгенерированный пример (только текстовые поля)',
      value: genOfferExample(),
    },
  };
}

const reviewContent = ensureContent(doc, '/comments/{offerId}', 'post', 'application/json');
if (reviewContent) {
  reviewContent.example = genReviewExample();
}

fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), 'utf-8');
console.log('Готово! Примеры для Swagger записаны в', SWAGGER_PATH);
