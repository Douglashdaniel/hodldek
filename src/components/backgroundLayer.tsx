import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Neb from "../images/neb.jpg";

const BackgroundLayer = () => {
  const history = useHistory();
  return (
    <StyledMain>
      <BackImage src={Neb} />
    </StyledMain>
  );
};

export default BackgroundLayer;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  z-index: -10;
`;

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.15;
  @media only screen and (min-width: 320px) and (max-width: 768px) {
    width: auto;
  }
`;
