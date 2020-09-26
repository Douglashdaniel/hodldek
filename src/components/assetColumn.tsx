import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Moon from "../images/moon.png";
import Ship from "../images/pumpicon.png";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";

interface IProps {
  ticker: string;
  icon: string;
  ath: number;
  price: number;
  action?: () => void;
  disabled: boolean;
}

const AssetColumn = (props: IProps) => {
  const { ticker, icon, ath, price, action, disabled } = props;

  const showRocket = useSelector(
    (state: StoreState) =>
      state.showRocket.showRocket && state.showRocket.showRocket
  );
  const moonRotation = useSelector(
    (state: StoreState) =>
      state.moonRotation.moonRotation && state.moonRotation.moonRotation
  );
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const theme = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  const [moonValue, setMoonValue] = useState<{ perc: number }>({ perc: 0 });

  const calculatPercentage = useCallback(() => {
    const calcMoon = price / ath;
    const finalMoon = calcMoon * 100;
    setMoonValue({ perc: Math.round(finalMoon) });
  }, [setMoonValue, ath, price]);

  const calculatDecimalPlace = useCallback((number) => {
    if (number !== null && number !== undefined && number !== 0) {
      if (number > 1) {
        return number.toFixed(2);
      } else {
        const newNumber = -Math.floor(Math.log(number) / Math.log(10) + 1);
        console.log({ ath: number, "number of zeros": newNumber });
        if (newNumber === 0) {
          return number.toFixed(2);
        }
        if (newNumber >= 1) {
          console.log({ "what is the problem": newNumber });
          const added = Number(newNumber) + 2;
          return number.toFixed(added);
        }
      }
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    calculatPercentage();
  }, [calculatPercentage]);

  return (
    <Wrapper>
      <Main adjust={disabled}>
        <PriceText color={theme}>${calculatDecimalPlace(ath)}</PriceText>
        <ProgressBarContainer percent={moonValue.perc} mode={darkMode}>
          <ProgressBar mode={darkMode} color={theme}>
            <PriceNameWrapper
              mode={darkMode}
              percent={moonValue.perc < 7 ? true : false}
              percentM={moonValue.perc < 10 ? true : false}
            >
              <TickerText>{ticker.toUpperCase()}</TickerText>
              <CurrentPrice>${calculatDecimalPlace(price)}</CurrentPrice>
            </PriceNameWrapper>
          </ProgressBar>
        </ProgressBarContainer>
        {disabled !== true && (
          <PercentContainer onClick={action} percent={moonValue.perc}>
            <PercentLine color={theme} />
          </PercentContainer>
        )}
        <MoonGraphic src={Moon} rotate={moonRotation} />
        {showRocket && (
          <ShipGraphic
            percent={moonValue.perc}
            src={Ship}
            higher={moonValue.perc < 7 ? true : false}
          />
        )}
        {disabled !== true && <CoinGraphic src={icon} />}
      </Main>
    </Wrapper>
  );
};

export default AssetColumn;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const Main = styled.div<{ adjust: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 80px;
  top: 60px;
  position: absolute;
  bottom: ${({ adjust }) => (adjust ? `0px` : "60px")};
  z-index: 10;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    bottom: ${({ adjust }) => (adjust ? `0px` : "50px")};
    top: 45px;
  }
`;

const PriceText = styled.span<{ color: string }>`
  // color: #56b4e9;
  // color: rgba(0, 158, 115, 1);
  color: ${({ color }) =>
    color ? `rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  margin-top: 6px;
  font-size: 12px;
  font-weight: bold;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
  }
`;

const CurrentPrice = styled.span`
  font-size: 12px;
  // color: white;
  margin-top: 4px;
`;

const PriceNameWrapper = styled.div<{
  percent: boolean;
  mode: boolean;
  percentM: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ percent, mode }) =>
    percent ? (mode ? "white" : "rgba(0,0,0,0.8)") : "white"};
  position: ${({ percent }) => (percent ? `absolute` : "relative")};
  top: ${({ percent }) => (percent ? `-45px` : "0px")};
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    top: ${({ percentM }) => (percentM ? `-45px` : "0px")};
    color: ${({ percentM, mode }) =>
      percentM ? (mode ? "white" : "rgba(0,0,0,0.8)") : "white"};
  }
`;

const TickerText = styled.span`
  // color: white;
  font-weight: bold;
  margin-top: 6px;
  font-size: 14px;
`;

const MoonGraphic = styled.img<{ rotate: boolean }>`
  width: 50px;
  height: 50px;
  top: -55px;
  position: absolute;
  // animation: rotation 40s linear infinite;
  animation: ${({ rotate }) => (rotate ? `rotation 40s linear infinite` : "")};
  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    width: 40px;
    height: 40px;
    top: -40px;
  }
`;

const ProgressBarContainer = styled.div<{
  percent: number;
  mode: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 70px;
  // background-color: rgba(23, 24, 27, 0.9);
  background-color: ${({ mode }) =>
    mode ? `rgba(23, 24, 27, 0.9)` : "rgba(255, 255, 255, 0.9)"};
  height: ${({ percent }) => (percent ? `${percent}%` : "0px")};
  position: absolute;
  bottom: 0px;
  z-index: 10;
  border-radius: 4px;
  // transition-delay: 0s;
  // transition-duration: 0.5s;
  // transition-timing-function: ease;
`;

const ProgressBar = styled.div<{ mode: boolean; color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background: ${({ mode, color }) =>
    mode
      ? color
        ? `linear-gradient(
        to bottom,
        rgba(${color}, 1),
        rgba(${color}, 0.4),
        rgba(${color}, 0.1),
        rgba(${color}, 0)
      )`
        : `linear-gradient(
    to bottom,
    rgba(0, 158, 115, 1),
    rgba(0, 158, 115, 0.4),
    rgba(0, 158, 115, 0.1),
    rgba(0, 158, 115, 0)
  )`
      : color
      ? `linear-gradient(
        to bottom,
        rgba(${color}, 1),
        rgba(${color}, 0.9),
        rgba(${color}, 0.8),
        rgba(${color}, 0.7)
      )`
      : `linear-gradient(
    to bottom,
    rgba(0, 158, 115, 1),
    rgba(0, 158, 115, 0.9),
    rgba(0, 158, 115, 0.8),
    rgba(0, 158, 115, 0.7)
  )`};
  height: 100%;
  border-radius: 4px;
`;

const PercentContainer = styled.div<{ percent: number }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 70px;
  height: ${({ percent }) => (percent ? `${percent}%` : "0px")};
  position: absolute;
  bottom: 0px;
  z-index: 40;
  opacity: 0;
  &:hover {
    opacity: 1;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    &:hover {
      opacity: 0;
      justify-content: flex-end;
    }
  }
  // transition: transform 0.2s;
`;

const PercentLine = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  position: fixed;
  left: 300px;
  right: 5px;
  z-index: 100;
  border-bottom: ${({ color }) =>
    color ? `2px dashed rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  // border-bottom: 2px dashed #56b4e9;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    left: 5px;
  }
`;

const ShipGraphic = styled.img<{ percent: number; higher: boolean }>`
  width: 40px;
  height: auto;
  position: absolute;
  margin-bottom: 6px;
  bottom: ${({ percent, higher }) =>
    percent ? (higher ? `${percent + 5}%` : `${percent}%`) : "0px"};
`;

const CoinGraphic = styled.img`
  width: auto;
  height: 40px;
  bottom: 10px;
  position: fixed;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    height: 30px;
  }
`;
