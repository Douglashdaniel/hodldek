import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Toggle from "./toggle";
import Tag from "./tag";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import HamburgerIcon from "../images/ham.png";
import CloseIcon from "../images/close.png";
import { toggle_darkmode } from "../redux/actions/darkMode.action";
import { toggle_moon_rotation } from "../redux/actions/moonRotation.action";
import { toggle_percent_lines } from "../redux/actions/percentLines.action";
import { toggle_rockets } from "../redux/actions/rockets.action";
import { set_initial_list } from "../redux/actions/initialList.action";
import { set_theme } from "../redux/actions/theme.action";
import { StoreState } from "../redux/reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Theme } from "../types/api";
import WindowDimensions from "./windowDimensions";
import Logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import DLight from "../images/logoassets/dlight.png";
import DDark from "../images/logoassets/ddark.png";
import HGreen from "../images/logoassets/hgreen.png";
import HBlue from "../images/logoassets/hblue.png";
import HOrange from "../images/logoassets/horange.png";
import HPink from "../images/logoassets/hpink.png";
import HPurple from "../images/logoassets/hpurple.png";
import BraveBanner from "../images/braveBrowser.gif";

const SideNav = () => {
  const { height, width } = WindowDimensions();
  let history = useHistory();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<{ input: string }>({
    input: "",
  });

  const [toggleTheme, setToggleTheme] = useState<Boolean>(false);
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const [numberToShow, setNumberToShow] = useState<number>(12);

  const showRocket = useSelector(
    (state: StoreState) =>
      state.showRocket.showRocket && state.showRocket.showRocket
  );
  const showPercentage = useSelector(
    (state: StoreState) =>
      state.showPercentage.percentLines && state.showPercentage.percentLines
  );
  const moonRotation = useSelector(
    (state: StoreState) =>
      state.moonRotation.moonRotation && state.moonRotation.moonRotation
  );
  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const cryptoSearchOptions = useSelector(
    (state: StoreState) =>
      state.cryptoOptions.options && state.cryptoOptions.options
  );

  const initialList = useSelector(
    (state: StoreState) =>
      state.initialList.initialList && state.initialList.initialList
  );

  const themeColor = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  const removeCoin = useCallback(
    (coin: string) => {
      const list = initialList;
      const newList = list.filter(function (value) {
        return value !== coin;
      });
      console.log(newList);
      dispatch(set_initial_list(newList));
    },
    [initialList]
  );

  const setThemeColor = useCallback(
    (color: string) => {
      dispatch(set_theme(color));
    },
    [dispatch]
  );

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const addCoin = useCallback(
    (coin: string) => {
      const list = initialList;
      const newList = [...list, coin];
      console.log(newList);
      dispatch(set_initial_list(newList));
      setSearchText({ input: "" });
      setShowMenu(false);
    },
    [initialList]
  );

  const filterList = useCallback(() => {
    const list = cryptoSearchOptions;
    if (searchText.input === "") {
      return null;
    } else {
      const newList = list.filter((value) => {
        return (
          value.symbol.toLowerCase() === searchText.input.toLowerCase() ||
          value.name.toLowerCase().startsWith(searchText.input.toLowerCase())
        );
      });
      console.log(newList);
      return newList?.map((name) => (
        <SearchResults
          action={() => addCoin(name.id)}
          buttonKey={name.id}
          name={name.name}
          ticker={name.symbol}
          textKey={name.id}
        />
      ));
    }
  }, [searchText, cryptoSearchOptions, addCoin, darkMode]);

  const onSearchChange = useCallback(
    (event: any) => {
      setSearchText({ input: event.target.value });
      console.log(event.target.value);
    },
    [setSearchText, filterList()]
  );

  const toggleRocket = () => dispatch(toggle_rockets());
  const togglePercentBar = () => dispatch(toggle_percent_lines());
  const toggleDarkMode = () => dispatch(toggle_darkmode());
  const toggleMoonRotation = () => dispatch(toggle_moon_rotation());
  // let theNumber = 12;

  // switch (width) {
  //   case width > 1460:
  //     let theNumber = 11;
  //     break;
  //   case width > 1200:
  //     return 10;
  //     break;
  // }

  const getNewNumber = useCallback(() => {
    if (width < 820) {
      return 2;
    } else {
      return 14;
    }
  }, [width]);

  const getColor = useCallback(() => {
    if (themeColor === "0, 158, 115") {
      return HGreen;
    }
    if (themeColor === "0, 126, 158") {
      return HBlue;
    }
    if (themeColor === "94, 96, 199") {
      return HPurple;
    }
    if (themeColor === "158, 0, 156") {
      return HPink;
    }
    if (themeColor === "211, 116, 24") {
      return HOrange;
    }
  }, [themeColor]);

  return (
    <>
      <Header mode={darkMode}>
        <TitleWrapper onClick={() => history.push(`/`)}>
          <LogoStyle src={darkMode ? DDark : DLight} />
          <LogoStyle src={getColor()} />
          <TitleLeft theme={themeColor}>hodl</TitleLeft>
          <TitleRight mode={darkMode}>dek</TitleRight>
        </TitleWrapper>
        <MenuClick onClick={() => toggleMenu()}>
          {/* <Icons
            isVisible={showMenu}
            src={showMenu ? CloseIcon : HamburgerIcon}
          /> */}
          <FontAwesomeIcon
            size="lg"
            color={darkMode ? "white" : `rgb(${themeColor})`}
            icon={showMenu ? faTimes : faBars}
          />
        </MenuClick>
      </Header>
      <SideNavWrapper mode={darkMode} isVisible={showMenu}>
        <SearchBar
          action={onSearchChange}
          value={searchText.input}
          disabled={initialList.length > getNewNumber()}
          allowed={getNewNumber()}
          total={initialList.length}
        />
        <ScrollContainer theme={themeColor}>{filterList()}</ScrollContainer>
        <TagContainer>
          {initialList?.map((coin) => (
            <Tag key={coin} title={coin} action={() => removeCoin(coin)} />
          ))}
        </TagContainer>
        <Toggle
          title="Rockets:"
          action={toggleRocket}
          isSelected={showRocket}
        />
        <Toggle
          title="Moon Rotation:"
          action={toggleMoonRotation}
          isSelected={moonRotation}
        />
        <Toggle
          title="Percent Lines:"
          action={togglePercentBar}
          isSelected={showPercentage}
        />
        <Toggle
          title="Dark Mode:"
          action={toggleDarkMode}
          isSelected={darkMode}
        />
        <ToggleWrapper>
          <ToggleText mode={darkMode} color={themeColor}>
            Theme:
          </ToggleText>
          <ChangeText
            isVisible={toggleTheme}
            mode={darkMode}
            color={themeColor}
            onClick={() => setToggleTheme(true)}
          >
            select
          </ChangeText>
        </ToggleWrapper>
        <ColorRow isVisible={toggleTheme}>
          {Theme?.map((color) => (
            <ColorBox
              key={color}
              color={color}
              onClick={() => {
                setThemeColor(color);
                setToggleTheme(false);
              }}
              isSelected={color === themeColor ? true : false}
              mode={darkMode}
            />
          ))}
        </ColorRow>
        {/* <ToggleText mode={darkMode} color={themeColor}>
          {height} - {width} - {numberToShow}
        </ToggleText> */}
        <AdWrapper>
          <BannerAd
            onClick={() => window.open("https://brave.com/hod437", "_blank")}
            src={BraveBanner}
          />
        </AdWrapper>
      </SideNavWrapper>
    </>
  );
};

export default SideNav;

const Header = styled.div<{ mode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 290px;
  position: fixed;
  left: 5px;
  top: 5px;
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
  z-index: 110;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    width: auto;
    right: 5px;
  }
`;

const TitleWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const SideNavWrapper = styled.div<{ mode: boolean; isVisible: boolean }>`
  // background-color: rgb(37, 37, 39);
  background-color: ${({ mode }) => (mode ? "rgb(37, 37, 39)" : "#f1f2f3")};
  display: flex:
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 290px;
  position: absolute;
  left: 5px;
  top: 45px;
  bottom: 5px;
  overflow: hidden;
  padding-top: 5px;
  z-index: 100;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    bottom: 45px;
    width: auto;
    right: 5px;
    left: ${({ isVisible }) => (isVisible ? "5px" : "1000px")};
    transition-delay: ${({ isVisible }) => (isVisible ? "0s" : "0.4s")};
    transition-duration: ${({ isVisible }) => (isVisible ? "0.6s" : "0.6s")};
    transition-timing-function: ${({ isVisible }) =>
      isVisible ? "ease-out" : "ease-in"};
  }
  `;

const Icons = styled.img<{ isVisible: boolean }>`
  width: ${({ isVisible }) => (!isVisible ? "20px" : "15px")};
  height: ${({ isVisible }) => (!isVisible ? "20px" : "15px")};
`;

const MenuClick = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  flex-directio: row;
  justify-content: center;
  align-self: flex-end;
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    display: flex;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 5px;
`;

const ToggleText = styled.span<{ mode: boolean; color: string }>`
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode ? "white" : color ? `rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  margin-right: 5px;
  font-weight: bold;
`;

const ChangeText = styled.span<{
  mode: boolean;
  color: string;
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? `none` : "flex")};
  cursor: pointer;
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode ? "white" : color ? `rgba(${color}, 1)` : "rgba(0, 158, 115, 1)"};
  margin-right: 5px;
  font-weight: normal;
  text-decoration: underline;
`;

const TitleLeft = styled.span<{ theme: string }>`
  font-size: 28px;
  font-weight: bold;
  margin-left: 33px;
  color: ${({ theme }) =>
    theme ? `rgba(${theme}, 1)` : `rgba(0, 158, 115, 1)`};
`;

const TitleRight = styled.span<{ mode: boolean }>`
  font-size: 28px;
  font-weight: bold;
  color: ${({ mode }) => (mode ? `white` : `rgba(0,0,0,0.6)`)};
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;
`;

const ScrollContainer = styled.div<{ theme: string }>`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex:
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-height: 25%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme ? `rgba(${theme}, 0.8)` : `rgba(0, 158, 115, 0.8)`};
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme ? `rgba(${theme}, 1)` : `rgba(0, 158, 115, 1)`};
  }
  `;

const ColorRow = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? `flex` : "none")};
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex: 1;
  padding: 5px;
`;

const ColorBox = styled.div<{
  color: string;
  isSelected: boolean;
  mode: boolean;
}>`
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => (color ? `rgba(${color}, 1)` : "none")};
  border: ${({ isSelected, mode }) =>
    isSelected
      ? mode
        ? `2px solid rgba(255, 255, 255, 1)`
        : "2px solid rgba(0,0,0,0.6)"
      : "none"};
`;

const LogoStyle = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 5px;
  position: fixed;
`;

const AdWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 5px;
  position: absolute;
  bottom: 0px;
`;

const BannerAd = styled.img`
  cursor: pointer;
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const LimitText = styled.span<{ mode: boolean; color: string }>`
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode ? `white` : color ? `rgba(${color}, 1)` : `rgba(0, 158, 115, 1)`};
  margin-right: 4px;
`;
