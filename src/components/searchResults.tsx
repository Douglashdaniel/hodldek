import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
interface IProps {
  buttonKey: string;
  textKey: string;
  action: () => void;
  name: string;
  ticker: string;
}

const SearchResults = (props: IProps) => {
  const { action, buttonKey, textKey, ticker, name } = props;

  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  return (
    <SelectContainer mode={darkMode} key={buttonKey} onClick={action}>
      <SelectText mode={darkMode} key={textKey}>
        {name} ({ticker})
      </SelectText>
    </SelectContainer>
  );
};

export default SearchResults;

const SelectContainer = styled.div<{ mode: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: 4px;
  margin: 2px;
  background-color: ${({ mode }) => (mode ? `rgb(23, 24, 27)` : `white`)};
`;

const SelectText = styled.span<{ mode: boolean }>`
  font-size: 14px;
  color: ${({ mode }) => (mode ? `white` : `rgba(0,0,0,0.6)`)};
`;
