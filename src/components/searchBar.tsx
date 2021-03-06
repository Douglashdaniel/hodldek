import React from 'react';
import styled from 'styled-components';
import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';
interface IProps {
	value: string;
	action: (event: any) => void;
}

const SearchBar = (props: IProps) => {
	const { action, value } = props;

	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	// const theme = useSelector(
	// 	(state: StoreState) => state.theme.color && state.theme.color
	// );

	return (
		<SearchBarWrapper $mode={darkMode}>
			<SearchBarInput
				placeholder="Search"
				value={value}
				onChange={action}
				$mode={darkMode}
			/>
		</SearchBarWrapper>
	);
};

export default SearchBar;

const SearchBarWrapper = styled.div<{ $mode: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	// padding-left: 5px;
	// padding-right: 5px;
	margin-left: 5px;
	margin-right: 5px;
	border-bottom: ${({ $mode }) =>
		$mode ? `1px solid rgba(255, 255, 255, 0.8)` : `1px solid rgba(0,0,0,0.6)`};
`;

const SearchBarInput = styled.input<{ $mode: boolean }>`
	width: 100%;
	outline: none;
	border: none;
	background-image: none;
	background-color: transparent;
	box-shadow: none;
	color: ${({ $mode }) => ($mode ? `white` : `rgba(0,0,0,0.6)`)};
	padding: 5px;
	font-size: 14px;
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-weight: 700;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	::-webkit-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}

	:-ms-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}

	::placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	:focus {
		outline: none;
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	@media only screen and (min-width: 320px) and (max-width: 820px) {
		font-size: 16px;
	}
`;
