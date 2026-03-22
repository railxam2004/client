import { describe, it, expect } from 'vitest';
import { getCity, getOffersByCity, sortOffersByType } from '../utils';
import { CITIES_LOCATION } from '../const';
import type { SortOffer } from '../types/sort';
import { makeFakeOffer } from './mocks';

describe('getCity', () => {
  it('возвращает город по имени', () => {
    const result = getCity('Paris', CITIES_LOCATION);

    expect(result.name).toBe('Paris');
  });

  it('возвращает первый город, если совпадение не найдено', () => {
    const result = getCity('Tokyo', CITIES_LOCATION);

    expect(result.name).toBe(CITIES_LOCATION[0].name);
  });
});

describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = {
      name: CITIES_LOCATION[0].name,
      location: { ...CITIES_LOCATION[0].location },
    };
    const cologne = {
      name: CITIES_LOCATION[1].name,
      location: { ...CITIES_LOCATION[1].location },
    };
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };

    const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);

    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });

  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];

    expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity('Paris', [])).toEqual([]);
  });

  it('возвращает весь список, если город не передан', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];

    expect(getOffersByCity(undefined, offers)).toEqual(offers);
  });
});

describe('sortOffersByType', () => {
  const priceToHigh: SortOffer = 'PriceToHigh';
  const priceToLow: SortOffer = 'PriceToLow';
  const topRated: SortOffer = 'TopRated';
  const popular: SortOffer = 'Popular';

  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const result = sortOffersByType(offers, priceToHigh);

    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];

    const result = sortOffersByType(offers, priceToLow);

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(100);
  });

  it('сортирует по рейтингу (TopRated)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];

    const result = sortOffersByType(offers, topRated);

    expect(result[0].rating).toBe(5);
    expect(result[2].rating).toBe(3);
  });

  it('при Popular сохраняет исходный порядок', () => {
    const firstOffer = { ...makeFakeOffer(), id: '1' };
    const secondOffer = { ...makeFakeOffer(), id: '2' };
    const offers = [firstOffer, secondOffer];

    const result = sortOffersByType(offers, popular);

    expect(result).toEqual([firstOffer, secondOffer]);
  });

  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const copy = [...offers];

    sortOffersByType(offers, priceToHigh);

    expect(offers).toEqual(copy);
  });

  it('корректно работает при пустом массиве', () => {
    expect(sortOffersByType([], priceToHigh)).toEqual([]);
  });
});