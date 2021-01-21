import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
interface IProps {
  title: string;
  action: () => void;
}

const Tag = (props: IProps) => {
  const { title, action } = props;

  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const theme = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  return (
    <TagWrapper mode={darkMode} color={theme}>
      <TagText mode={darkMode} color={theme}>
        {title}
      </TagText>
      <DeleteText onClick={action} mode={darkMode} color={theme}>
        x
      </DeleteText>
    </TagWrapper>
  );
};

export default Tag;

const TagWrapper = styled.div<{ mode: boolean; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 4px;
  border: ${({ mode, color }) =>
    mode
      ? color
        ? `1px solid rgba(${color}, 1)`
        : `1px solid rgba(0, 158, 115, 1)`
      : `1px solid rgba(0,0,0,0.6)`};
  border-radius: 4px;
  margin: 2px;
  background-color: ${({ mode }) =>
    mode ? `rgba(255,255,255,0)` : `rgba(255,255,255,0.9)`};
`;

const TagText = styled.span<{ mode: boolean; color: string }>`
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode ? `white` : color ? `rgba(${color}, 1)` : `rgba(0, 158, 115, 1)`};
  margin-right: 4px;
`;

const DeleteText = styled.span<{ mode: boolean; color: string }>`
  cursor: pointer;
  font-size: 14px;
  color: ${({ mode, color }) =>
    mode
      ? color
        ? `rgba(${color}, 1)`
        : `rgba(0, 158, 115, 1)`
      : `rgba(0,0,0,0.6)`};
`;
