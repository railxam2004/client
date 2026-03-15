import { createAction } from '@reduxjs/toolkit';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers,
}));

export const setCurrentOffer = createAction<FullOffer | null>('offer/setCurrentOffer');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const setUserData = createAction<UserData | null>('user/setUserData');
export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export const setError = createAction('data/setError', (error: string | null) => ({
  payload: error,
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');
