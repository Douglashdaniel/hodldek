import React, {
	useEffect,
	// useState
} from 'react';
import styled from 'styled-components';
// import LoadingSpinner from '../components/loadingSpinner';
// import Asset from '../components/assetColumn';
import { StoreState } from '../redux/reducers/index';
import {
	useSelector,
	// useDispatch
} from 'react-redux';
import { useParams } from 'react-router-dom';
// import { toggle_is_loading } from '../redux/actions/isLoading.action';
// import { CryptoObject, CryptoObjectDefault } from '../types/api';
// import PricingChart from '../components/pricingChart';

interface ParamsType {
	id: string;
}

const MoonReport = () => {
	// const dispatch = useDispatch();
	let { id } = useParams<ParamsType>();
	// const [coinInfo, setCoinInfo] = useState<[CryptoObject]>([
	// 	CryptoObjectDefault,
	// ]);
	// const [pricingData, setPricingData] = useState<Object[]>([{}]);
	// const [volumeData, setVolumeData] = useState<Object[]>([{}]);
	// const isLoading = useSelector(
	// 	(state: StoreState) => state.isLoading.isLoading && state.isLoading.isLoading
	// );
	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	useEffect(() => {
		// dispatch(toggle_is_loading());
		// fetch(
		// 	`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
		// )
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		// console.log(data);
		// 		setCoinInfo(data);
		// 	});
		// fetch(
		// 	`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
		// )
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		// console.log(data);
		// 		const pricing = data.prices;
		// 		const volumn = data.total_volumes;
		// 		const formatedPrices = pricing.map((index) => {
		// 			return {
		// 				date: Moment(index[0]).format('MMMM Do YYYY, h:mm:ss a'),
		// 				time: Moment(index[0]).format('h:mm a'),
		// 				uv: index[1].toFixed(4),
		// 				price: index[1].toFixed(4),
		// 				pv: volumn[pricing.indexOf(index)][1],
		// 			};
		// 		});
		// 		console.log(formatedPrices);
		// 		setPricingData(formatedPrices);
		// 		dispatch(toggle_is_loading());
		// 	});
	}, []);

	return (
		<Wrapper mode={darkMode}>
			<Layout>
				<Text>{id.toUpperCase()}</Text>
				<Text>Coming Soon..</Text>
			</Layout>
		</Wrapper>
	);
};

export default MoonReport;

const Wrapper = styled.div<{ mode: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	height: 100vh;
	background-color: ${({ mode }) => (mode ? `rgb(23, 24, 27)` : 'white')};
	position: fixed;
	overflow: hidden;
`;

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	align-content: center;
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
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		left: 5px;
		top: 110px;
		right: none;
	}
`;

const Text = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 22px;
	font-weight: 700;
	color: white;
`;
