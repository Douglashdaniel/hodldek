import React from "react";
import styled from "styled-components";
import Asset from "../components/assetColumn";
import LoadingSpinner from "../components/loadingSpinner";
import PercentLines from "../components/percentLines";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";

const Home = () => {
  let history = useHistory();
  const isLoading = useSelector(
    (state: StoreState) =>
      state.isLoading.isLoading && state.isLoading.isLoading
  );
  const showPercentage = useSelector(
    (state: StoreState) =>
      state.showPercentage.percentLines && state.showPercentage.percentLines
  );
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const cryptoList = useSelector(
    (state: StoreState) =>
      state.cryptoChartData.data && state.cryptoChartData.data
  );

  return (
    <Wrapper mode={darkMode}>
      {isLoading && <LoadingSpinner darkMode={darkMode} />}
      <AssetContainer>
        {cryptoList?.map((coin) => (
          <Asset
            key={coin.id}
            ticker={coin.symbol}
            icon={coin.image}
            ath={coin.ath}
            price={coin.current_price}
            // action={() => history.push(`/moon/report/${coin.id}`)}
            disabled={false}
          />
        ))}
      </AssetContainer>
      <BottomBar mode={darkMode} />
      {showPercentage && <PercentLines />}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div<{ mode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: auto;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: ${({ mode }) => (mode ? `rgb(23, 24, 27)` : "white")};
  position: fixed;
  overflow: hidden;
`;

const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  top: 0px;
  position: absolute;
  left: 330px;
  right: 5px;
  bottom: 0px;
  // @media only screen and (min-width: 320px) and (max-width: 1500px) {
  //   justify-content: flex-start;
  //   right: none;
  //   overflow-y: hidden;
  //   overflow-x: scroll;
  //   width: auto;
  //   background-color: green;
  // }
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    left: 5px;
    top: 40px;
    right: none;
  }
`;

const BottomBar = styled.div<{ mode: boolean }>`
  flex: 1;
  height: 50px;
  position: fixed;
  bottom: 5px;
  left: 300px;
  right: 5px;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    left: 5px;
    height: 40px;
  }
`;
