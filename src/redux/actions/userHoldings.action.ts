import { UserHoldingsType } from '../../types/api';
export const SET_USER_HOLDINGS = 'SET_USER_HOLDINGS';
export const set_user_holdings = (payload: UserHoldingsType[]) => ({
	type: SET_USER_HOLDINGS,
	payload,
});
