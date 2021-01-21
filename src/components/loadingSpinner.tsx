import React from 'react';
import styled from 'styled-components';

interface IProps {
	darkMode: boolean;
}

const LoadingSpinner = (props: IProps) => {
	const { darkMode } = props;
	return (
		<Overlap $mode={darkMode}>
			<LoadingSpinnerCircle $mode={darkMode} />
			<LoadingText $mode={darkMode}>Loading</LoadingText>
		</Overlap>
	);
};

export default LoadingSpinner;

const Overlap = styled.div<{ $mode: boolean }>`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 200;
	background-color: ${({ $mode }) =>
		$mode ? `rgba(0,0,0,0.8)` : `rgba(255,255,255,0.8)`};
`;

const LoadingSpinnerCircle = styled.div<{ $mode: boolean }>`
	border: 4px solid #f3f3f3;
	border-top: ${({ $mode }) =>
		$mode ? `4px solid #000000` : `4px solid rgba(0, 158, 115, 1)`};
	border-radius: 100%;
	width: 50px;
	height: 50px;
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

const LoadingText = styled.span<{ $mode: boolean }>`
	color: ${({ $mode }) => ($mode ? `white` : `rgba(0, 158, 115, 1)`)};
	font-family: proxima-nova, Avenir, sans-serif;
	padding-top: 10px;
	font-size: 28px;
	text-align: center;
`;
