import { SET_CRYPTO_CHART_DATA } from "../actions/cryptoChartData.action";
import { CryptoObject, CryptoObjectDefault } from "../../types/api";

export interface CryptoChartDataState {
  data: CryptoObject[];
}

const defaultState = {
  data: [CryptoObjectDefault],
};

export default (state = defaultState, action: any): CryptoChartDataState => {
  switch (action.type) {
    case SET_CRYPTO_CHART_DATA: {
      const payloadData = action.payload;
      return { ...state, data: payloadData };
    }
    default: {
      return state;
    }
  }
};
