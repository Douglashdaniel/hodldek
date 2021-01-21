import React from 'react';
import styled from 'styled-components';
import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
interface IProps {
	buttonKey: string;
	textKey: string;
	action: () => void;
	name: string;
	ticker: string;
	disabled: boolean;
}

const SearchResults = (props: IProps) => {
	const { action, buttonKey, textKey, ticker, name, disabled } = props;

	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	return (
		<SelectContainer mode={darkMode} key={buttonKey} onClick={action}>
			<NameAndTicker>
				<SelectText mode={darkMode} key={textKey}>
					{name}
				</SelectText>
				<Ticker>{ticker.toUpperCase()}</Ticker>
			</NameAndTicker>
			<FontAwesomeIcon
				size="sm"
				color="white"
				icon={disabled ? faCog : faPlusCircle}
			/>
		</SelectContainer>
	);
};

export default SearchResults;

const SelectContainer = styled.div<{ mode: boolean }>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: 6px;
	margin: 2px;
	background-color: ${({ mode }) => (mode ? `rgb(23, 24, 27)` : `white`)};
`;

const NameAndTicker = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
`;

const SelectText = styled.span<{ mode: boolean }>`
	font-size: 14px;
	color: ${({ mode }) => (mode ? `white` : `rgba(0,0,0,0.6)`)};
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-weight: 700;
`;

const Ticker = styled.span`
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-size: 10px;
	background-color: rgba(255, 255, 255, 0.08);
	padding: 2px 4px;
	font-weight: 700;
	color: white;
	border-radius: 5px;
	margin-left: 4px;
`;
