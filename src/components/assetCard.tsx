import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CryptoObject, UserHoldingsType } from '../types/api';
import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';
import FormateNumber from '../functions/formatNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateInput from './updateInput';
import {
	faCog,
	faSortUp,
	faSortDown,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PriceChart from './pricingChart';
import Moment from 'moment';

interface IProps {
	info: CryptoObject;
	updateAction: (coin: string, amount: number) => void;
	holdings: UserHoldingsType[];
	removeAction: (coin: string) => void;
}

const AssetCard = (props: IProps) => {
	const [pricingData, setPricingData] = useState<Object[]>([{}]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showSettings, setShowSettings] = useState<boolean>(false);
	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);
	const theme = useSelector(
		(state: StoreState) => state.theme.color && state.theme.color
	);
	const { info, updateAction, holdings, removeAction } = props;

	const findHoldingAmount = useCallback(() => {
		const amount = holdings.find((asset) => {
			return asset.name === info.id;
		});
		return amount;
	}, [holdings, info]);

	useEffect(() => {
		if (info.id) {
			setIsLoading(true);
			fetch(
				`https://api.coingecko.com/api/v3/coins/${info.id}/market_chart?vs_currency=usd&days=1`
			)
				.then((response) => response.json())
				.then((data) => {
					// console.log(data);
					const pricing = data.prices;
					const volumn = data.total_volumes;
					const formatedPrices = pricing?.map((index) => {
						return {
							date: Moment(index[0]).format('MMMM Do YYYY, h:mm:ss a'),
							time: Moment(index[0]).format('h:mm a'),
							uv: index[1],
							price: index[1],
							pv: volumn[pricing.indexOf(index)][1],
						};
					});
					setPricingData(formatedPrices);
				})
				.then(() => setIsLoading(false));
		}
	}, [info]);

	const holdingAmount = findHoldingAmount()?.amount;

	const [holdingsInput, setHoldingsInput] = useState<{
		input: number | undefined;
	}>({
		input: holdingAmount,
	});

	const onHoldingsChange = useCallback(
		(event: any) => {
			setHoldingsInput({ input: event.target.value });
		},
		[setHoldingsInput]
	);

	const toggleSettings = useCallback(() => {
		setShowSettings(!showSettings);
		setHoldingsInput({ input: holdingAmount });
	}, [showSettings, holdingAmount]);

	const finalHoldings =
		holdingsInput.input !== undefined ? holdingsInput.input : 0;

	return (
		<BoxForCrypto>
			<InnerCryptoBox $mode={darkMode} color={theme}>
				<IconAndName>
					<CoinGraphicContainer>
						<CoinGraphic src={info.image} />
					</CoinGraphicContainer>
					<NameAndTicker>
						<Name>{info.name}</Name>
						<Ticker>{info.symbol.toUpperCase()}</Ticker>
					</NameAndTicker>
				</IconAndName>
				<Settings showSettings={showSettings} onClick={() => toggleSettings()}>
					<FontAwesomeIcon
						size="1x"
						color="white"
						icon={showSettings ? faTimes : faCog}
					/>
				</Settings>

				<PriceRow>
					<PricingColumn>
						<PriceTitle>Current Price</PriceTitle>
						<Price>${FormateNumber(info.current_price)}</Price>
						<Percent isUp={info.price_change_percentage_24h > 0}>
							<FontAwesomeIcon
								size="lg"
								color="white"
								icon={info.price_change_percentage_24h > 0 ? faSortUp : faSortDown}
							/>{' '}
							{Math.abs(info.price_change_percentage_24h).toFixed(2)}%
						</Percent>
					</PricingColumn>
				</PriceRow>
				<PricingWrapper>
					{isLoading ? (
						<LoadingSpinnerCircle $mode={darkMode} />
					) : (
						<PriceContainer>
							<PriceChart priceData={pricingData} />
						</PriceContainer>
					)}
				</PricingWrapper>
				<SettingsWrapper color={theme} showSettings={showSettings}>
					{!showSettings && (
						<HoldingsRow>
							<HoldingText>
								{holdingAmount
									? `$${FormateNumber(holdingAmount * info.current_price)}`
									: '$0.00'}
							</HoldingText>
							<HoldingText>
								{FormateNumber(holdingAmount)} {info.symbol.toUpperCase()}
							</HoldingText>
						</HoldingsRow>
					)}
					{showSettings && (
						<SettingContainer>
							<PriceTitle>{info.name} Holdings</PriceTitle>
							<UpdateInput value={holdingsInput.input} action={onHoldingsChange} />
							<UpdateButton onClick={() => updateAction(info.id, finalHoldings)}>
								Update {info.symbol.toUpperCase()} Holdings
							</UpdateButton>
							<RemoveButton onClick={() => removeAction(info.id)}>
								Remove {info.symbol.toUpperCase()} from Portfolio
							</RemoveButton>
						</SettingContainer>
					)}
				</SettingsWrapper>
			</InnerCryptoBox>
		</BoxForCrypto>
	);
};

export default AssetCard;

const BoxForCrypto = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: center;
	flex-direction: column;
	min-width: calc(100% / 3);
	max-width: calc(100% / 3);
	height: calc(100% / 3);
	max-height: calc(100% / 3);
	padding-bottom: 5px;
	padding-right: 5px;
	overflow: hidden;
	position: relative;
	@media only screen and (min-width: 320px) and (max-width: 1280px) {
		min-width: calc(100% / 2);
		max-width: calc(100% / 2);
		height: calc(100% / 2);
		max-height: calc(100% / 2);
	}
	@media only screen and (min-width: 320px) and (max-width: 1024px) {
		min-width: 100%;
		max-width: 100%;
	}
`;

const InnerCryptoBox = styled.div<{ $mode: boolean; color: string }>`
	display: flex;
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	padding-top: 5px;
	// border: ${({ $mode, color }) =>
		$mode
			? color
				? `1px solid rgba(${color}, 1)`
				: `1px solid rgba(0, 158, 115, 1)`
			: `1px solid rgba(0,0,0,0.6)`};
	// background-color: ${({ $mode }) => ($mode ? 'rgb(48, 48, 51)' : '#f1f2f3')};
	background: linear-gradient(180deg, rgb(48, 48, 51) 0%, rgb(37, 37, 39) 100%);
	// border: 2px solid rgba(255, 255, 255, 0.4);
	// background-color: green;
	border-radius: 5px;
`;

const IconAndName = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	z-index: 200;
`;

const NameAndTicker = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
`;

const Name = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 18px;
	font-weight: 700;
	color: white;
`;

const Percent = styled.span<{ isUp: boolean }>`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 10px;
	background-color: ${({ isUp }) => (isUp ? '#16c784' : '#ea3943')};
	padding: 2px 4px;
	font-weight: 700;
	color: white;
	border-radius: 5px;
	margin-top: 2px;
`;

const Ticker = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 12px;
	background-color: rgba(255, 255, 255, 0.08);
	padding: 2px 4px;
	font-weight: 700;
	color: white;
	border-radius: 5px;
`;

const PriceRow = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: center;
	flex-direction: row;
	width: 100%;
	align-self: center;
`;

const SettingsWrapper = styled.div<{ color: string; showSettings: boolean }>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	// border-top: 1px solid rgba(255, 255, 255, 0.4);
	// background-color: rgb(37, 37, 39);
	background-color: ${({ color }) =>
		color ? `rgba(${color}, 1)` : `rgb(37, 37, 39)`};
	position: absolute;
	bottom: 0px;
	z-index: 150;
	height: ${({ showSettings }) => (showSettings ? `100%` : `30px`)};
	padding-left: 10px;
	padding-right: 10px;
	transition-delay: 0s;
    transition-duration: 0.4s;
    transition-timing-function: ${({ showSettings }) =>
					showSettings ? 'ease-out' : 'ease-in'};
  }
`;

const SettingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 50%;
	height: 100%;
	box-sizing: border-box;
	padding: 10px;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		width: 80%;
	}
`;

const HoldingsRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
`;

const PricingColumn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const PriceTitle = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 12px;
	font-weight: 500;
	line-height: 14px;
	color: white;
`;

const Price = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 18px;
	font-weight: 700;
	color: white;
`;

const HoldingText = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 16px;
	font-weight: 700;
	color: white;
`;

const Settings = styled.div<{ showSettings: boolean }>`
	display: flex;
	cursor: pointer;
	top: 10px;
	right: 10px;
	position: absolute;
	z-index: 200;
	transform: ${({ showSettings }) =>
		showSettings ? 'rotate(180deg)' : 'rotate(0deg)'};
	transition-delay: 0s;
	transition-duration: 0.4s;
	transition-timing-function: ${({ showSettings }) =>
		showSettings ? 'ease-out' : 'ease-in'};
`;

const CoinGraphicContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 40px;
	height: 40px;
	overflow: hidden;
	background-color: white;
	border-radius: 100%;
	// top: 10px;
	// left: 10px;
	// position: absolute;
	margin-right: 10px;
	margin-left: 10px;
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
`;

const CoinGraphic = styled.img`
	width: 30px;
	height: auto;
	margin: 0px;
	padding: 0px;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		width: 30px;
	}
`;

const PricingWrapper = styled.div`
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-top: 20px;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 5px;
	position: absolute;
	bottom: 30px;
	// background-color: blue;
	height: calc(100vh / 6);

	@media only screen and (min-width: 320px) and (max-width: 1280px) {
		height: calc(100vh / 4);
	}
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		height: calc(100vh / 5);
	}
`;

const PriceContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: calc(100vh / 6);
	width: 100%;

	height: 100%;
	// background-color: green;
	// overflow: hidden;
	// @media only screen and (min-width: 320px) and (max-width: 1280px) {
	// 	height: calc(100vh / 4);
	// }
	// @media only screen and (min-width: 320px) and (max-width: 960px) {
	// 	min-width: 50%;
	// 	max-width: 50%;
	// }
	// @media only screen and (min-width: 320px) and (max-width: 820px) {
	// 	height: calc(100vh / 4);
	// }
`;

const LoadingSpinnerCircle = styled.div<{ $mode: boolean }>`
	border: 4px solid #f3f3f3;
	border-top: ${({ $mode }) =>
		$mode ? `4px solid #000000` : `4px solid rgba(0, 158, 115, 1)`};
	border-radius: 100%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const UpdateButton = styled.div`
	display: flex;
	cursor: pointer;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.2);
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 16px;
	font-weight: 500;
	color: white;
	padding: 5px 0px;
	border-radius: 5px;
	margin: 10px 0px;
`;

const RemoveButton = styled.div`
	display: flex;
	cursor: pointer;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 12px;
	font-weight: 500;
	color: white;
	padding: 5px 0px;
	border-radius: 5px;
	position: absolute;
	bottom: 10px;
`;
