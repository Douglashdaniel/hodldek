import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/loadingSpinner";
import Asset from "../components/assetColumn";
import { StoreState } from "../redux/reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toggle_is_loading } from "../redux/actions/isLoading.action";
import { CryptoObject, CryptoObjectDefault } from "../types/api";
import PercentLines from "../components/percentLines";
import Moment from "moment";
//@ts-ignore
import PricingChart from "../components/pricingChart";

const MoonReport = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [coinInfo, setCoinInfo] = useState<[CryptoObject]>([
    CryptoObjectDefault,
  ]);
  const [pricingData, setPricingData] = useState<Object[]>([{}]);
  const [volumeData, setVolumeData] = useState<Object[]>([{}]);
  const isLoading = useSelector(
    (state: StoreState) =>
      state.isLoading.isLoading && state.isLoading.isLoading
  );
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  useEffect(() => {
    dispatch(toggle_is_loading());
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCoinInfo(data);
      });
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const pricing = data.prices;
        const volumn = data.total_volumes;
        const formatedPrices = pricing.map((index) => {
          return {
            date: Moment(index[0]).format("MMMM Do YYYY, h:mm:ss a"),
            time: Moment(index[0]).format("h:mm a"),
            uv: index[1].toFixed(4),
            price: index[1].toFixed(4),
            pv: volumn[pricing.indexOf(index)][1],
          };
        });
        console.log(formatedPrices);
        setPricingData(formatedPrices);
        dispatch(toggle_is_loading());
      });
  }, []);

  return (
    <Wrapper mode={darkMode}>
      <ReportContainer>
        {isLoading && <LoadingSpinner darkMode={darkMode} />}
        {/* <span style={{ color: "white" }}>{JSON.stringify(coinInfo[0].id)}</span> */}

        {/* <BottomBar mode={darkMode} /> */}
        <LeftColumn>
          <TopRow>
            <Box mode={darkMode} needsMargin={true} />
            <Box mode={darkMode} needsMargin={true} />
            <Box mode={darkMode} needsMargin={true} />
            <Box mode={darkMode} needsMargin={false} />
          </TopRow>
          <PricingWrapper mode={darkMode}>
            <PriceContainer mode={darkMode}>
              <PricingChart priceData={pricingData} />
            </PriceContainer>
          </PricingWrapper>
        </LeftColumn>
        <MoonContainer mode={darkMode}>
          {/* <PercentLines /> */}
          <Asset
            key={coinInfo[0].id}
            ticker={coinInfo[0].symbol}
            icon={coinInfo[0].image}
            ath={coinInfo[0].ath}
            price={coinInfo[0].current_price}
            disabled={true}
          />
        </MoonContainer>
      </ReportContainer>
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
  background-color: rgb(23, 24, 27);
  background-color: ${({ mode }) => (mode ? `rgb(23, 24, 27)` : "white")};
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  top: 5px;
  position: absolute;
  left: 300px;
  right: 0px;
  bottom: 5px;
  overflow: hidden;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  // background-color: green;
  height: 25%;
  width: 100%;
  margin-bottom: 5px;
`;

const MoonContainer = styled.div<{ mode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 100px;
  height: 100%;
  margin-right: 5px;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 100%;
  margin-left: 0px;
  margin-right: 5px;
`;

const PricingWrapper = styled.div<{ mode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
`;

const PriceContainer = styled.div<{ mode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  height: 250px;
  width: 100%;
  overflow: hidden;
  margin: 20px;
`;

const BottomBar = styled.div<{ mode: boolean }>`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 5px;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
`;

const Box = styled.div<{ mode: boolean; needsMargin: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 25%;
  height: 100%;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
  margin-right: ${({ needsMargin }) => (needsMargin ? "5px" : "0px")};
`;
