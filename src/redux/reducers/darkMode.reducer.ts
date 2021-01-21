import { TOGGLE_DARKMODE } from "../actions/darkMode.action";

export interface DarkModeState {
  darkMode: boolean;
}

const default_state: DarkModeState = {
  darkMode: true,
};

export default (
  state: DarkModeState = default_state,
  action: any
): DarkModeState => {
  switch (action.type) {
    case TOGGLE_DARKMODE: {
      return {
        darkMode: !state.darkMode,
      };
    }
    default:
      return state;
  }
};
