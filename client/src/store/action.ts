import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers,
}));

export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');