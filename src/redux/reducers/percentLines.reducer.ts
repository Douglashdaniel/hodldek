import { TOGGLE_PERCENT_LINES } from "../actions/percentLines.action";

export interface PercentLinesState {
  percentLines: boolean;
}

const default_state: PercentLinesState = {
  percentLines: true,
};

export default (
  state: PercentLinesState = default_state,
  action: any
): PercentLinesState => {
  switch (action.type) {
    case TOGGLE_PERCENT_LINES: {
      return {
        percentLines: !state.percentLines,
      };
    }
    default:
      return state;
  }
};
