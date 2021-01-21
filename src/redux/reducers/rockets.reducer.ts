import { TOGGLE_ROCKETS } from "../actions/rockets.action";

export interface RocketsState {
  showRocket: boolean;
}

const default_state: RocketsState = {
  showRocket: false,
};

export default (
  state: RocketsState = default_state,
  action: any
): RocketsState => {
  switch (action.type) {
    case TOGGLE_ROCKETS: {
      return {
        showRocket: !state.showRocket,
      };
    }
    default:
      return state;
  }
};
