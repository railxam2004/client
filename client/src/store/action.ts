import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList, FullOffer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatusType } from '../types/authorization-status';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers,
}));

export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export const setError = createAction('data/setError', (error: string | null) => ({
  payload: error
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

// НОВЫЕ ДЕЙСТВИЯ ДЛЯ ЛАБЫ 5
export const loadOffer = createAction<FullOffer | null>('data/loadOffer');
export const loadReviews = createAction<Review[]>('data/loadReviews');
export const loadNearby = createAction<OffersList[]>('data/loadNearby');
export const setReviewSubmitStatus = createAction<boolean>('data/setReviewSubmitStatus');