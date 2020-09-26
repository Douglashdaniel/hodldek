import { SET_THEME } from "../actions/theme.action";

export interface ThemeState {
  color: string;
}

const defaultState = {
  color: "0, 158, 115",
};

export default (state = defaultState, action: any): ThemeState => {
  switch (action.type) {
    case SET_THEME: {
      const data = action.payload;
      return { ...state, color: data };
    }
    default: {
      return state;
    }
  }
};
