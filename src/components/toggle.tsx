import React from "react";
import styled from "styled-components";
import { StoreState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
interface IProps {
  title: string;
  action: () => void;
  isSelected: boolean;
}

const Toggle = (props: IProps) => {
  const { title, action, isSelected } = props;

  const darkMode = useSelector(
    (state: StoreState) => state.darkMode.darkMode && state.darkMode.darkMode
  );

  const theme = useSelector(
    (state: StoreState) => state.theme.color && state.theme.color
  );

  return (
    <ToggleWrapper>
      <ToggleText mode={darkMode} color={theme}>
        {title}
      </ToggleText>
      <ToggleContainer
        onClick={action}
        show={isSelected}
        mode={darkMode}
        color={theme}
      >
        <ToggleCircle show={isSelected} />
      </ToggleContainer>
    </ToggleWrapper>
  );
};

export default Toggle;

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

const ToggleContainer = styled.div<{
  show: boolean;
  mode: boolean;
  color: string;
}>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ show }) => (show ? `flex-end` : "flex-start")};
  width: 40px;
  height: 15px;
  background-color: ${({ show, mode, color }) =>
    show
      ? color
        ? `rgba(${color}, 1)`
        : `rgba(0, 158, 115, 1)`
      : mode
      ? `#282e3b`
      : `#c5d0de`};
  border-radius: 15px;
  border: ${({ show, mode, color }) =>
    show
      ? color
        ? `4px solid rgba(${color}, 1)`
        : `4px solid rgba(0, 158, 115, 1)`
      : mode
      ? `4px solid #282e3b`
      : `4px solid #c5d0de`};
  // border: 4px solid rgba(0, 158, 115, 1);
  // overflow: hidden;
`;

const ToggleCircle = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 100%;
  box-shadow: ${({ show }) =>
    show
      ? `-2px 0px 5px rgba(0, 0, 0, 0.6)`
      : "2px 0px 5px rgba(0, 0, 0, 0.6)"};
  // box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.6);
  transition-delay: 0s;
  transition-duration: 1s;
  transition-timing-function: ease;
`;
