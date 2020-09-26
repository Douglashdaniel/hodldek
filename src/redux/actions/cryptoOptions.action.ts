import { CryptoOptions } from "../../types/api";
export const SET_CRYPTO_OPTIONS = "SET_CRYPTO_OPTIONS";
export const set_crypto_options = (payload: CryptoOptions[]) => ({
  type: SET_CRYPTO_OPTIONS,
  payload,
});
