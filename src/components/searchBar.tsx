import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
interface IProps {
  disabled: boolean;
  value: string;
  action: () => void;
  allowed: number;
  total: number;
}

const SearchBar = (props: IProps) => {
  const { action, disabled, value, total, allowed } = props;

  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const theme = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  return (
    <SearchBarWrapper>
      <SearchBarInput
        disabled={disabled}
        placeholder={
          disabled ? `Search is disabled until you remove a coin.` : "Search"
        }
        value={value}
        onChange={action}
        mode={darkMode}
      />
      <LimitText mode={darkMode} color={theme}>
        {total}/{allowed + 1}
      </LimitText>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
`;

const SearchBarInput = styled.input<{ mode: boolean }>`
  width: 100%;
  border: ${({ mode }) =>
    mode ? `1px solid rgba(255, 255, 255, 0.8)` : `1px solid rgba(0,0,0,0.6)`};
  border-radius: 4px;
  background-color: ${({ mode }) =>
    mode ? `rgba(255,255,255,0)` : `rgba(255,255,255,0.9)`};
  color: ${({ mode }) => (mode ? `white` : `rgba(0,0,0,0.6)`)};
  padding: 5px;
  font-size: 14px;
  :focus {
    outline: none;
  }
  @media only screen and (min-width: 320px) and (max-width: 820px) {
    font-size: 16px;
  }
`;

const LimitText = styled.span<{ mode: boolean; color: string }>`
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode ? `white` : color ? `rgba(${color}, 1)` : `rgba(0, 158, 115, 1)`};
  margin-left: 5px;
  position: absolute;
  right: 10px;
`;
