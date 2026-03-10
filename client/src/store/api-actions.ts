import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OffersList, FullOffer } from '../types/offer';
import { Review } from '../types/review';
import { 
  offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus,
  loadOffer, loadReviews, loadNearby, setReviewSubmitStatus 
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData, UserData } from '../types/user-data';
import { store } from './index';

export const fetchOffersAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<OffersList[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(offersCityList(data));
  },
);

// ЗАДАНИЕ 5.2: Загрузка одного оффера, отзывов и соседних предложений
export const fetchOfferAction = createAsyncThunk<void, string, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadOffer(data));
      
      const { data: reviews } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(loadReviews(reviews));

      const { data: nearby } = await api.get<OffersList[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(loadNearby(nearby));
    } catch {
      dispatch(loadOffer(null)); // Если 404
    }
  },
);

// ЗАДАНИЕ 5.4: Отправка комментария
export const postReviewAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'data/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setReviewSubmitStatus(true));
    try {
      const { data } = await api.post<Review>(`${APIRoute.Reviews}/${offerId}`, { comment, rating });
      // После успешной отправки обновляем список отзывов
      const { data: updatedReviews } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(loadReviews(updatedReviews));
    } finally {
      dispatch(setReviewSubmitStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);