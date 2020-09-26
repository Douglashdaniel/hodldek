import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderComponent = () => {
  const history = useHistory();
  return (
    <>
      {/* <Banner>
        <BannerText>Join my NEW book club today.</BannerText>
        <JoinText>Join Now!</JoinText>
      </Banner> */}
      <Main>
        <Center>
          <LinksRow>
            <Title>hodldek</Title>
            {/* <Link onClick={() => history.push("/")}>Home</Link> */}
            {/* <Link onClick={() => history.push("/")}>Log in</Link> */}
          </LinksRow>
        </Center>
      </Main>
    </>
  );
};

export default HeaderComponent;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  background-color: white;
  position: relative:
  z-index: 100;
  border-bottom: 1px solid #e8e8e8;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #027a64;
  position: relative;
`;

const BannerText = styled.span`
  font-family: "GTAmericaLight", "Helvetica Lighter", "Arial", sans-serif;
  font-size: 15px;
  color: white;
  letter-spacing: 0;
  vertical-align: baseline;
  font-weight: initial;
`;

const JoinText = styled.span`
  cursor: pointer;
  font-family: "GTAmericaLight", "Helvetica Lighter", "Arial", sans-serif;
  font-size: 16px;
  color: white;
  letter-spacing: 0;
  vertical-align: baseline;
  font-weight: initial;
  text-decoration: underline;
  margin-left: 10px;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  max-width: 1224px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const LinksRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const Title = styled.span`
  font-size: 32px;
  // font-family: Brush Script MT, Brush Script Std, cursive;
  font-style: normal;
  color: #222222;
  margin-right: 20px;
`;

const Link = styled.a`
  cursor: pointer;
  margin-left: 20px;
  font-family: "GTAmericaLight", "Helvetica Lighter", "Arial", sans-serif;
  font-size: 15px;
  color: #222222;
  text-decoration: none;
  vertical-align: baseline;
  font-weight: initial;
  &:hover {
    color: #027a64;
  }
  transition-delay: 0.05s;
  transition-duration: 0.3s;
`;
