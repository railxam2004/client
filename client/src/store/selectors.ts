import { State } from '../types/state';
import { AuthorizationStatusType } from '../types/authorization-status';

export const getAuthorizationStatus = (state: State): AuthorizationStatusType => state.authorizationStatus;
export const getCurrentOffer = (state: State) => state.currentOffer;
export const getReviews = (state: State) => state.reviews;
export const getUserData = (state: State) => state.userData;
