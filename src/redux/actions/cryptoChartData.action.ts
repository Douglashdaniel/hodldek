import { CryptoObject } from "../../types/api";
export const SET_CRYPTO_CHART_DATA = "SET_CRYPTO_CHART_DATA";
export const set_crypto_chart_data = (payload: CryptoObject[]) => ({
  type: SET_CRYPTO_CHART_DATA,
  payload,
});
