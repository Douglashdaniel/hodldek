import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import SearchBar from './searchBar';
import AmountInput from './amountInput';
import SearchResults from './searchResults';
import { set_user_holdings } from '../redux/actions/userHoldings.action';
import { set_theme } from '../redux/actions/theme.action';
import { StoreState } from '../redux/reducers/index';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Theme, CryptoOptions } from '../types/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import DLight from '../images/logoassets/dlight.png';
import DDark from '../images/logoassets/ddark.png';
import HGreen from '../images/logoassets/hgreen.png';
import HBlue from '../images/logoassets/hblue.png';
import HOrange from '../images/logoassets/horange.png';
import HPink from '../images/logoassets/hpink.png';
import HPurple from '../images/logoassets/hpurple.png';
import BraveBanner from '../images/braveBrowser.gif';
import FormateNumber from '../functions/formatNumber';

// To Be Used in the future
// import WindowDimensions from './windowDimensions';
// import { toggle_darkmode } from '../redux/actions/darkMode.action';
// import Toggle from './toggle';

const SideNav = () => {
	// const { height, width } = WindowDimensions();
	let history = useHistory();
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState<{ input: string }>({
		input: '',
	});
	const [amountInput, setAmountInput] = useState<{ input: number | undefined }>({
		input: undefined,
	});
	const [toggleTheme, setToggleTheme] = useState<boolean>(false);
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [coinID, setCoinID] = useState<CryptoOptions>({
		id: '',
		name: '',
		symbol: '',
	});
	const [showAmountInput, setShowAmountInput] = useState<boolean>(false);

	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	const cryptoSearchOptions = useSelector(
		(state: StoreState) =>
			state.cryptoOptions.options && state.cryptoOptions.options
	);

	const priceData = useSelector(
		(state: StoreState) =>
			state.cryptoChartData.data && state.cryptoChartData.data
	);

	const userHoldings = useSelector(
		(state: StoreState) => state.holdings.holdings && state.holdings.holdings
	);

	const themeColor = useSelector(
		(state: StoreState) => state.theme.color && state.theme.color
	);

	const setThemeColor = useCallback(
		(color: string) => {
			dispatch(set_theme(color));
		},
		[dispatch]
	);

	const toggleMenu = useCallback(() => {
		setShowMenu(!showMenu);
	}, [showMenu]);

	const cancelAdd = useCallback(() => {
		setCoinID({ id: '', name: '', symbol: '' });
		setSearchText({ input: '' });
		setAmountInput({ input: undefined });
		setShowAmountInput(false);
	}, []);

	const addCoin = useCallback(() => {
		const newCoin = coinID.id;
		const amount = Number(amountInput.input);
		const holding = userHoldings;
		const newHolding = {
			name: newCoin,
			amount: amount,
		};
		const newHoldings = [...holding, newHolding];
		console.log(newHoldings);
		dispatch(set_user_holdings(newHoldings));
		cancelAdd();
		setShowMenu(false);
	}, [dispatch, userHoldings, amountInput, coinID, cancelAdd]);

	const selectCoin = useCallback((coin: CryptoOptions, disabled: boolean) => {
		if (disabled) {
			return null;
		} else {
			setCoinID(coin);
			setShowAmountInput(true);
		}
	}, []);

	const filterList = useCallback(() => {
		const list = cryptoSearchOptions;
		if (searchText.input === '') {
			return null;
		} else {
			const newList = list.filter((value) => {
				return (
					value.symbol.toLowerCase() === searchText.input.toLowerCase() ||
					value.name.toLowerCase().startsWith(searchText.input.toLowerCase())
				);
			});
			const holdings = userHoldings;
			const holdingsList = holdings.map((id) => {
				return id.name;
			});
			const createdList = newList?.map((name) => {
				const isDisabled = holdingsList.includes(name.id) ? true : false;
				return (
					<SearchResults
						key={name.id}
						action={() => selectCoin(name, isDisabled)}
						buttonKey={name.id}
						name={name.name}
						ticker={name.symbol}
						textKey={name.id}
						disabled={isDisabled}
					/>
				);
			});
			return createdList;
		}
	}, [searchText, cryptoSearchOptions, selectCoin, userHoldings]);

	const onSearchChange = useCallback(
		(event: any) => {
			setSearchText({ input: event.target.value });
		},
		[setSearchText]
	);

	const onAmountChange = useCallback(
		(event: any) => {
			setAmountInput({ input: event.target.value });
		},
		[setAmountInput]
	);

	const findAssettAmount = useCallback(
		(id) => {
			const holdings = userHoldings;
			const amount = holdings.find((asset) => {
				return asset.name === id;
			});
			return amount;
		},
		[userHoldings]
	);

	const calculateTotalHoldings = useCallback(() => {
		const prices = priceData;
		const amountList = prices.map((coin) => {
			const amount = findAssettAmount(coin.id)?.amount;
			const holdingAmount = amount ? amount : 0;
			return coin.current_price * holdingAmount;
		});
		const grandTotal = amountList.reduce(function (a, b) {
			return a + b;
		}, 0);
		const formatedTotal = FormateNumber(grandTotal);
		return formatedTotal;
	}, [findAssettAmount, priceData]);

	const TotalHoldings = calculateTotalHoldings();

	// const toggleDarkMode = () => dispatch(toggle_darkmode());

	// const getNewNumber = useCallback(() => {
	// 	const screenWidth = width ? width : 0;
	// 	if (screenWidth < 820) {
	// 		return 2;
	// 	} else {
	// 		return 14;
	// 	}
	// }, [width]);

	const selectColor = useCallback(
		(color) => {
			setThemeColor(color);
			setToggleTheme(false);
			toggleMenu();
		},
		[setThemeColor, toggleMenu]
	);

	const getColor = useCallback(() => {
		if (themeColor === '0, 158, 115') {
			return HGreen;
		}
		if (themeColor === '0, 126, 158') {
			return HBlue;
		}
		if (themeColor === '94, 96, 199') {
			return HPurple;
		}
		if (themeColor === '158, 0, 156') {
			return HPink;
		}
		if (themeColor === '211, 116, 24') {
			return HOrange;
		}
	}, [themeColor]);

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<>
			<Header $mode={darkMode}>
				<HeaderRow>
					<TitleWrapper onClick={() => history.push(`/`)}>
						<LogoStyle src={darkMode ? DDark : DLight} />
						<LogoStyle src={getColor()} />
						<TitleLeft theme={themeColor}>hodl</TitleLeft>
						<TitleRight $mode={darkMode}>dek</TitleRight>
					</TitleWrapper>
					<MenuClick onClick={() => toggleMenu()}>
						<FontAwesomeIcon
							size="lg"
							color={darkMode ? 'white' : `rgb(${themeColor})`}
							icon={showMenu ? faTimes : faBars}
						/>
					</MenuClick>
				</HeaderRow>
				<TotalColumn onClick={() => refreshPage()}>
					<PriceTitle>Total Holdings</PriceTitle>
					<Price>${TotalHoldings ? TotalHoldings : '0.00'}</Price>
				</TotalColumn>
				<Refresh onClick={() => refreshPage()}>
					<FontAwesomeIcon size="1x" color="white" icon={faSyncAlt} />
				</Refresh>
			</Header>
			<SideNavWrapper $mode={darkMode} isVisible={showMenu}>
				{showAmountInput ? (
					<InputAndButtons>
						<NameAndTickerRow>
							<Name>{coinID.name}</Name>
							<Ticker>{coinID.symbol.toUpperCase()}</Ticker>
						</NameAndTickerRow>
						<AmountInput action={onAmountChange} value={amountInput.input} />
						<ButtonRow>
							<Button onClick={() => cancelAdd()} color={themeColor}>
								Cancel
							</Button>
							<Button onClick={() => addCoin()} color={themeColor}>
								Add
							</Button>
						</ButtonRow>
					</InputAndButtons>
				) : (
					<SearchBar action={onSearchChange} value={searchText.input} />
				)}
				{!showAmountInput && (
					<ScrollContainer theme={themeColor}>{filterList()}</ScrollContainer>
				)}
				{/* <Toggle title="Dark Mode:" action={toggleDarkMode} isSelected={darkMode} /> */}
				{!showAmountInput && (
					<ToggleWrapper>
						<ToggleText $mode={darkMode} color={themeColor}>
							Theme:
						</ToggleText>
						<ChangeText
							isVisible={toggleTheme}
							$mode={darkMode}
							color={themeColor}
							onClick={() => setToggleTheme(true)}
						>
							select
						</ChangeText>
					</ToggleWrapper>
				)}
				{!showAmountInput && (
					<ColorRow isVisible={toggleTheme}>
						{Theme?.map((color) => (
							<ColorBox
								key={color}
								color={color}
								onClick={() => selectColor(color)}
								isSelected={color === themeColor ? true : false}
								$mode={darkMode}
							/>
						))}
					</ColorRow>
				)}
				<AdWrapper>
					<BannerAd
						onClick={() => window.open('https://brave.com/hod437', '_blank')}
						src={BraveBanner}
					/>
				</AdWrapper>
			</SideNavWrapper>
		</>
	);
};

export default SideNav;

const Header = styled.div<{ $mode: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 290px;
	position: fixed;
	left: 5px;
	top: 5px;
	background-color: ${({ $mode }) => ($mode ? 'rgb(37, 37, 39)' : '#f1f2f3')};
	z-index: 110;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		width: auto;
		right: 5px;
	}
	border-radius: 5px;
`;

const HeaderRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	width: 100%;
`;

const TitleWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

const SideNavWrapper = styled.div<{ $mode: boolean; isVisible: boolean }>`
  // background-color: rgb(37, 37, 39);
  background-color: ${({ $mode }) => ($mode ? 'rgb(37, 37, 39)' : '#f1f2f3')};
  display: flex:
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 290px;
  position: fixed;
  left: 5px;
  top: 110px;
  bottom: 5px;
  overflow: hidden;
  padding-top: 5px;
  z-index: 100;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    bottom: 5px;
    width: auto;
	right: 5px;
	top: 100px;
    left: ${({ isVisible }) => (isVisible ? '5px' : '1000px')};
    transition-delay: ${({ isVisible }) => (isVisible ? '0s' : '0.4s')};
    transition-duration: ${({ isVisible }) => (isVisible ? '0.6s' : '0.6s')};
    transition-timing-function: ${({ isVisible }) =>
					isVisible ? 'ease-out' : 'ease-in'};
  }
  `;

const MenuClick = styled.div`
	cursor: pointer;
	width: 40px;
	height: 40px;
	display: none;
	align-items: center;
	flex-directio: row;
	justify-content: center;
	align-self: flex-end;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		display: flex;
	}
`;

const ButtonRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-directio: row;
	margin: 0px 6px;
	margin-top: 10px;
`;

const Button = styled.div<{ color: string }>`
	display: flex;
	cursor: pointer;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	width: 80px;
	background-color: ${({ color }) =>
		color ? `rgba(${color}, 1)` : `rgb(37, 37, 39)`};
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 16px;
	font-weight: 500;
	color: white;
	padding: 5px 0px;
	border-radius: 5px;
`;

const ToggleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex: 1;
	padding: 5px;
`;

const ToggleText = styled.span<{ $mode: boolean; color: string }>`
	font-size: 14px;
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-weight: 700;
	color: ${({ $mode, color }) =>
		$mode ? 'white' : color ? `rgba(${color}, 1)` : 'rgba(0, 158, 115, 1)'};
	margin-right: 5px;
`;

const ChangeText = styled.span<{
	$mode: boolean;
	color: string;
	isVisible: boolean;
}>`
	display: ${({ isVisible }) => (isVisible ? `none` : 'flex')};
	cursor: pointer;
	font-size: 14px;
	color: ${({ $mode, color }) =>
		$mode ? 'white' : color ? `rgba(${color}, 1)` : 'rgba(0, 158, 115, 1)'};
	margin-right: 5px;
	font-weight: normal;
	text-decoration: underline;
`;

const TitleLeft = styled.span<{ theme: string }>`
	font-size: 28px;
	font-weight: bold;
	margin-left: 33px;
	color: ${({ theme }) =>
		theme ? `rgba(${theme}, 1)` : `rgba(0, 158, 115, 1)`};
`;

const TitleRight = styled.span<{ $mode: boolean }>`
	font-size: 28px;
	font-weight: bold;
	color: ${({ $mode }) => ($mode ? 'white' : 'rgba(0,0,0,0.6)')};
`;

const InputAndButtons = styled.div`
margin-top: 5px;
margin-bottom: 5px;
display: flex:
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
`;

const ScrollContainer = styled.div<{ theme: string }>`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex:
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-height: 25%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
					theme ? `rgba(${theme}, 0.8)` : `rgba(0, 158, 115, 0.8)`};
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
					theme ? `rgba(${theme}, 1)` : `rgba(0, 158, 115, 1)`};
  }
  `;

const ColorRow = styled.div<{ isVisible: boolean }>`
	display: ${({ isVisible }) => (isVisible ? `flex` : 'none')};
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	flex: 1;
	padding: 5px;
`;

const ColorBox = styled.div<{
	color: string;
	isSelected: boolean;
	$mode: boolean;
}>`
	cursor: pointer;
	width: 15px;
	height: 15px;
	background-color: ${({ color }) => (color ? `rgba(${color}, 1)` : 'none')};
	border: ${({ isSelected, $mode }) =>
		isSelected
			? $mode
				? `2px solid rgba(255, 255, 255, 1)`
				: '2px solid rgba(0,0,0,0.6)'
			: 'none'};
`;

const LogoStyle = styled.img`
	width: 28px;
	height: 28px;
	margin-left: 5px;
	position: fixed;
`;

const AdWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 5px;
	position: absolute;
	bottom: 0px;
`;

const BannerAd = styled.img`
	cursor: pointer;
	width: 100%;
	height: auto;
	border-radius: 5px;
`;

const TotalColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	height: 70px;
	width: 100%;
	margin-left: 20px;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		align-items: center;
		height: 60px;
		margin-left: 0px;
	}
`;

const PriceTitle = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 12px;
	font-weight: 500;
	line-height: 12px;
	color: white;
`;

const Price = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 22px;
	font-weight: 700;
	color: white;
`;

const NameAndTickerRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-left: 6px;
	margin-bottom: 2px;
`;

const Name = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 18px;
	font-weight: 700;
	color: white;
	margin-right: 5px;
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

const Refresh = styled.div`
	display: none;
	cursor: pointer;
	bottom: 10px;
	right: 10px;
	position: absolute;
	z-index: 200;
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		display: flex;
	}
`;
