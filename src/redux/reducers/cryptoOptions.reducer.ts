import { SET_CRYPTO_OPTIONS } from "../actions/cryptoOptions.action";
import { CryptoOptions, CryptoOptionsDefault } from "../../types/api";

export interface CryptoOptionsState {
  options: CryptoOptions[];
}

const defaultState = {
  options: [CryptoOptionsDefault],
};

export default (state = defaultState, action: any): CryptoOptionsState => {
  switch (action.type) {
    case SET_CRYPTO_OPTIONS: {
      const data = action.payload;
      return { ...state, options: data };
    }
    default: {
      return state;
    }
  }
};
