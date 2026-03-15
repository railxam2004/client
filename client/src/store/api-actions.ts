import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import {
  offersCityList,
  requireAuthorization,
  setCurrentOffer,
  setError,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviews,
  setUserData,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData, UserData } from '../types/user-data';
import { store } from './index';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    dispatch(setOffersDataLoadingStatus(true));

    try {
      const { data } = await api.get<OffersList[]>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } catch {
      dispatch(setError('Не удалось загрузить список предложений'));
      dispatch(clearErrorAction());
      return rejectWithValue('Failed to fetch offers');
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const fetchOfferPageDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferPageData',
  async (offerId, { dispatch, extra: api, rejectWithValue }) => {
    dispatch(setOfferDataLoadingStatus(true));
    dispatch(setCurrentOffer(null));
    dispatch(setReviews([]));

    try {
      const [offerResponse, reviewsResponse] = await Promise.all([
        api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`),
        api.get<Review[]>(`${APIRoute.Comments}/${offerId}`),
      ]);

      dispatch(setCurrentOffer(offerResponse.data));
      dispatch(setReviews(reviewsResponse.data));
    } catch {
      return rejectWithValue('Failed to fetch offer page data');
    } finally {
      dispatch(setOfferDataLoadingStatus(false));
    }
  },
);

export const addReviewAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      dispatch(fetchOfferPageDataAction(offerId));
      dispatch(fetchOffersAction());
    } catch {
      dispatch(setError('Не удалось отправить отзыв'));
      dispatch(clearErrorAction());
      return rejectWithValue('Failed to add review');
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUserData(null));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      return data;
    } catch {
      dropToken();
      dispatch(setUserData(null));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return rejectWithValue('Login failed');
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserData(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
