import React from 'react';
import styled from 'styled-components';
import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';
interface IProps {
	value: number | undefined;
	action: (event: any) => void;
}

const UpdateInput = (props: IProps) => {
	const { action, value } = props;

	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	return (
		<AmountWrapper $mode={darkMode}>
			<AmountBarInput
				placeholder="Enter Amount"
				value={value}
				onChange={action}
				type="number"
				$mode={darkMode}
				inputMode="decimal"
			/>
		</AmountWrapper>
	);
};

export default UpdateInput;

const AmountWrapper = styled.div<{ $mode: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 2px;
	border-bottom: ${({ $mode }) =>
		$mode ? `1px solid rgba(255, 255, 255, 0.8)` : `1px solid rgba(0,0,0,0.6)`};
`;

const AmountBarInput = styled.input<{ $mode: boolean }>`
	width: 100%;
	text-align: center;
	padding: 5px;
	font-size: 18px;
	font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
		Helvetica, Arial, sans-serif;
	font-weight: 700;
	outline: none;
	border: none;
	background-image: none;
	background-color: transparent;
	box-shadow: none;
	color: ${({ $mode }) => ($mode ? `white` : `rgba(0,0,0,0.6)`)};
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
`;
