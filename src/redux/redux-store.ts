import { createStore } from 'redux';
import AllReducers from './reducers/index';

const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('list', serializedState);
	} catch (e) {
		console.log(e);
	}
};

const saveMode = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('mode', serializedState);
	} catch (e) {
		console.log(e);
	}
};

const saveTheme = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('theme', serializedState);
	} catch (e) {
		console.log(e);
	}
};

const saveHoldings = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('holdings', serializedState);
	} catch (e) {
		console.log(e);
	}
};

const loadList = () => {
	try {
		const serializedState = localStorage.getItem('list');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

const loadMode = () => {
	try {
		const serializedState = localStorage.getItem('mode');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

const loadTheme = () => {
	try {
		const serializedState = localStorage.getItem('theme');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

const loadHoldings = () => {
	try {
		const serializedState = localStorage.getItem('holdings');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

const persistedState = {
	initialList: loadList(),
	holdings: loadHoldings(),
	darkMode: loadMode(),
	theme: loadTheme(),
};

export const store = createStore(AllReducers, persistedState);

store.subscribe(() => {
	saveToLocalStorage(store.getState().initialList);
	saveHoldings(store.getState().holdings);
	saveMode(store.getState().darkMode);
	saveTheme(store.getState().theme);
});
