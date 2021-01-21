import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CurrencyPage from './pages/CurrencyPage';
import SideNav from './components/sideNav';
import { set_crypto_options } from './redux/actions/cryptoOptions.action';
import { set_crypto_chart_data } from './redux/actions/cryptoChartData.action';
import { toggle_is_loading } from './redux/actions/isLoading.action';
import { StoreState } from './redux/reducers/index';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';

function App() {
	const dispatch = useDispatch();
	const initialList = useSelector(
		(state: StoreState) =>
			state.initialList.initialList && state.initialList.initialList
	);
	const userHoldings = useSelector(
		(state: StoreState) => state.holdings.holdings && state.holdings.holdings
	);

	useEffect(() => {
		ReactGA.initialize('UA-177403687-1');
		ReactGA.pageview('/');
		dispatch(toggle_is_loading());
		if (userHoldings && userHoldings.length !== 0) {
			const fetchList = userHoldings.map((coin) => {
				return coin.name;
			});
			fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${fetchList}`
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					dispatch(set_crypto_chart_data(data));
					dispatch(toggle_is_loading());
				});
		} else {
			dispatch(set_crypto_chart_data([]));
			dispatch(toggle_is_loading());
		}
		fetch('https://api.coingecko.com/api/v3/coins/list')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				dispatch(set_crypto_options(data));
			});
	}, [initialList, dispatch, userHoldings]);

	return (
		<Wrapper>
			<SideNav />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/currencies/:id" component={CurrencyPage} exact />
				<Route path="/404" component={NotFound} exact />
				<Redirect to="/404" />
			</Switch>
		</Wrapper>
	);
}

export default App;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
