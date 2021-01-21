import React from 'react';
import styled from 'styled-components';
import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';

const NotFound = () => {
	const darkMode = useSelector(
		(state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
	);

	return (
		<Wrapper mode={darkMode}>
			<Layout>
				<Text>Page not found :(</Text>
			</Layout>
		</Wrapper>
	);
};

export default NotFound;

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
