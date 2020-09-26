import { TOGGLE_IS_LOADING } from "../actions/isLoading.action";

export interface IsLoadingState {
  isLoading: boolean;
}

const default_state: IsLoadingState = {
  isLoading: false,
};

export default (
  state: IsLoadingState = default_state,
  action: any
): IsLoadingState => {
  switch (action.type) {
    case TOGGLE_IS_LOADING: {
      return {
        isLoading: !state.isLoading,
      };
    }
    default:
      return state;
  }
};
