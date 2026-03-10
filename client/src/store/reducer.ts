import { createReducer } from '@reduxjs/toolkit';
import { OffersList, CityOffer, FullOffer } from '../types/offer';
import { Review } from '../types/review';
import { getCity } from '../utils';
import { 
  changeCity, offersCityList, requireAuthorization, setError, 
  setOffersDataLoadingStatus, loadOffer, loadReviews, loadNearby, setReviewSubmitStatus 
} from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { AuthorizationStatusType } from '../types/authorization-status';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  offer: FullOffer | null;
  reviews: Review[];
  nearby: OffersList[];
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
  isReviewSubmitInProgress: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  offer: null,
  reviews: [],
  nearby: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  isReviewSubmitInProgress: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearby = action.payload;
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
    .addCase(setReviewSubmitStatus, (state, action) => {
      state.isReviewSubmitInProgress = action.payload;
    });
});

export { reducer };