import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";

const NotFound = () => {
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  return (
    <Wrapper mode={darkMode}>
      <AssetContainer></AssetContainer>
    </Wrapper>
  );
};

export default NotFound;

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
