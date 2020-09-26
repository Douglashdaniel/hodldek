import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";

const PercentLines = () => {
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const theme = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  return (
    <PercentContainer>
      <HundredLine>
        <PercentText color={theme}>100%</PercentText>
        <Line mode={darkMode} />
      </HundredLine>
      <SeventyFiveLine>
        <PercentText color={theme}>75%</PercentText>
        <Line mode={darkMode} />
      </SeventyFiveLine>
      <FiftyLine>
        <PercentText color={theme}>50%</PercentText>
        <Line mode={darkMode} />
      </FiftyLine>
      <TwentyFiveLine>
        <PercentText color={theme}>25%</PercentText>
        <Line mode={darkMode} />
      </TwentyFiveLine>

      <ZeroLine>
        <ZeroPercentText color={theme}>0%</ZeroPercentText>
        <Line mode={darkMode} />
      </ZeroLine>
    </PercentContainer>
  );
};

export default PercentLines;

const PercentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 60px;
  position: absolute;
  bottom: 60px;
  right: 5px;
  left: 300px;
  z-index: 1;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    left: 5px;
    top: 85px;
    bottom: 50px;
  }
`;

const Line = styled.div<{ mode: boolean }>`
  width: 100%;
  border-top: ${({ mode }) =>
    mode
      ? `2px dashed rgba(255, 255, 255, 0.8)`
      : "2px dashed rgba(0, 0, 0, 0.8)"};
`;

const HundredLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const SeventyFiveLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: 25%;
  z-index: 1;
`;

const FiftyLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: 50%;
  z-index: 1;
`;

const TwentyFiveLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: 75%;
  z-index: 1;
`;

const ZeroLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 1;
`;

const PercentText = styled.span<{ color: string }>`
  // color: #56b4e9;
  color: ${({ color }) =>
    color ? `rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  font-size: 12px;
  font-weight: bold;
  margin-right: 6px;
  top: -6px;
  position: relative;
`;

const ZeroPercentText = styled.span<{ color: string }>`
  // color: #56b4e9;
  color: ${({ color }) =>
    color ? `rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  font-size: 12px;
  font-weight: bold;
  margin-right: 6px;
  top: -12px;
  position: relative;
`;
