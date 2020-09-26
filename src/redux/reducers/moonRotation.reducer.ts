import { TOGGLE_MOON_ROTATION } from "../actions/moonRotation.action";

export interface MoonRotationState {
  moonRotation: boolean;
}

const default_state: MoonRotationState = {
  moonRotation: true,
};

export default (
  state: MoonRotationState = default_state,
  action: any
): MoonRotationState => {
  switch (action.type) {
    case TOGGLE_MOON_ROTATION: {
      return {
        moonRotation: !state.moonRotation,
      };
    }
    default:
      return state;
  }
};
