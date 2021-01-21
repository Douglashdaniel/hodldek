import { SET_USER_HOLDINGS } from '../actions/userHoldings.action';
import { UserHoldingsType, InitialUserHoldings } from '../../types/api';

export interface UserHoldingsState {
	holdings: UserHoldingsType[];
}

const defaultState = {
	holdings: InitialUserHoldings,
};

export default (state = defaultState, action: any): UserHoldingsState => {
	switch (action.type) {
		case SET_USER_HOLDINGS: {
			const payloadData = action.payload;
			return { ...state, holdings: payloadData };
		}
		default: {
			return state;
		}
	}
};
