import { createReducer } from '@reduxjs/toolkit';
import { OffersList, CityOffer, FullOffer } from '../types/offer';
import { Review } from '../types/review';
import { getCity } from '../utils';
import {
  changeCity,
  offersCityList,
  requireAuthorization,
  setCurrentOffer,
  setError,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviews,
  setUserData,
} from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  currentOffer: FullOffer | null;
  reviews: Review[];
  userData: UserData | null;
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  currentOffer: null,
  reviews: [],
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    });
});

export { reducer };
