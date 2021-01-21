import DarkModeReducer from './darkMode.reducer';
import MoonRotationReducer from './moonRotation.reducer';
import PercentLinesReducer from './percentLines.reducer';
import RocketsReducer from './rockets.reducer';
import CryptoOptionsReducer from './cryptoOptions.reducer';
import CryptoChartDataReducer from './cryptoChartData.reducer';
import InitialListReducer from './initialList.reducer';
import UserHoldingsReducer from './userHoldings.reducer';
import IsLoadingReducer from './isLoading.reducer';
import ThemeReducer from './theme.reducer';
import { combineReducers } from 'redux';
import { CryptoOptionsState } from './cryptoOptions.reducer';
import { CryptoChartDataState } from './cryptoChartData.reducer';
import { DarkModeState } from './darkMode.reducer';
import { MoonRotationState } from './moonRotation.reducer';
import { PercentLinesState } from './percentLines.reducer';
import { RocketsState } from './rockets.reducer';
import { InitialListState } from './initialList.reducer';
import { UserHoldingsState } from './userHoldings.reducer';
import { IsLoadingState } from './isLoading.reducer';
import { ThemeState } from './theme.reducer';

export type StoreState = {
	showRocket: RocketsState;
	showPercentage: PercentLinesState;
	moonRotation: MoonRotationState;
	darkMode: DarkModeState;
	cryptoOptions: CryptoOptionsState;
	cryptoChartData: CryptoChartDataState;
	initialList: InitialListState;
	holdings: UserHoldingsState;
	isLoading: IsLoadingState;
	theme: ThemeState;
};

const allReducers = combineReducers({
	showRocket: RocketsReducer,
	showPercentage: PercentLinesReducer,
	moonRotation: MoonRotationReducer,
	darkMode: DarkModeReducer,
	cryptoOptions: CryptoOptionsReducer,
	cryptoChartData: CryptoChartDataReducer,
	initialList: InitialListReducer,
	holdings: UserHoldingsReducer,
	isLoading: IsLoadingReducer,
	theme: ThemeReducer,
});

export default allReducers;
