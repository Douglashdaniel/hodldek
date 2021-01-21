import React, { useCallback } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../components/loadingSpinner';
import { set_user_holdings } from '../redux/actions/userHoldings.action';
import { StoreState } from '../redux/reducers/index';
import { useSelector, useDispatch } from 'react-redux';
import AssetCard from '../components/assetCard';

const Home = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(
		(state: StoreState) => state.isLoading.isLoading && state.isLoading.isLoading
	);
	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	const cryptoList = useSelector(
		(state: StoreState) =>
			state.cryptoChartData.data && state.cryptoChartData.data
	);

	const userHoldings = useSelector(
		(state: StoreState) => state.holdings.holdings && state.holdings.holdings
	);

	const theme = useSelector(
		(state: StoreState) => state.theme.color && state.theme.color
	);

	const removeCoin = useCallback(
		(coin: string) => {
			const holdings = userHoldings;
			const newHoldings = holdings.filter(function (value) {
				return value.name !== coin;
			});
			console.log(newHoldings);
			dispatch(set_user_holdings(newHoldings));
		},
		[dispatch, userHoldings]
	);

	const updateCoin = useCallback(
		(coin: string, amount: number) => {
			const holdings = userHoldings;
			const newAmount = {
				name: coin,
				amount: Number(amount),
			};
			const removed = holdings.filter(function (value) {
				return value.name !== coin;
			});
			const newHoldings = [...removed, newAmount];
			dispatch(set_user_holdings(newHoldings));
		},
		[dispatch, userHoldings]
	);

	const findHoldingAmount = useCallback(
		(id: string) => {
			const amount = userHoldings.find((asset) => {
				return asset.name === id;
			});
			return amount;
		},
		[userHoldings]
	);

	const sortedList = useCallback(() => {
		const newList = cryptoList.map((asset) => {
			const dollarAmount = findHoldingAmount(asset.id)?.amount;
			return {
				...asset,
				holdingAmount: dollarAmount
					? dollarAmount * asset.current_price
					: 1 * asset.current_price,
			};
		});
		const newSortedList = newList.sort((a, b) =>
			a.holdingAmount && b.holdingAmount
				? b.holdingAmount - a.holdingAmount
				: a.current_price - b.current_price
		);
		return newSortedList;
	}, [findHoldingAmount, cryptoList]);

	return (
		<>
			<Wrapper $mode={darkMode}>
				{isLoading ? (
					<LoadingSpinner darkMode={darkMode} />
				) : (
					<NewAssetContainer theme={theme}>
						{sortedList().map((coin) => (
							<AssetCard
								key={coin.id}
								info={coin}
								updateAction={updateCoin}
								removeAction={removeCoin}
								holdings={userHoldings}
							/>
						))}
					</NewAssetContainer>
				)}
			</Wrapper>
		</>
	);
};

export default Home;

const Wrapper = styled.div<{ $mode: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	height: 100vh;
	background-color: ${({ $mode }) => ($mode ? `rgb(23, 24, 27)` : 'white')};
	position: fixed;
	overflow: hidden;
`;

const NewAssetContainer = styled.div<{ theme: string }>`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	align-content: flex-start;
	overflow-y: scroll;
	overflow-x: hidden;
	right: 0px;
	top: 5px;
	bottom: 0px;
	left: 300px;
	position: fixed;
	flex-wrap: wrap;
	::-webkit-scrollbar {
		// width: 6px;
		width: 0px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 6px;
	}
	::-webkit-scrollbar-thumb {
		background: ${({ theme }) =>
			theme ? `rgba(37, 37, 39, 0.8)` : `rgba(0, 158, 115, 0.8)`};
		border-radius: 6px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) =>
			theme ? `rgba(37, 37, 39, 0.8)` : `rgba(0, 158, 115, 1)`};
	}
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		left: 5px;
		top: 110px;
		right: none;
	}
`;
