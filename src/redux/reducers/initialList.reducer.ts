import { SET_INITIAL_LIST } from "../actions/initialList.action";
import { InitialListDefault } from "../../types/api";

export interface InitialListState {
  initialList: string[];
}

const defaultState = {
  initialList: InitialListDefault,
};

export default (state = defaultState, action: any): InitialListState => {
  switch (action.type) {
    case SET_INITIAL_LIST: {
      const data = action.payload;
      return { ...state, initialList: data };
    }
    default: {
      return state;
    }
  }
};
