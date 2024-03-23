import styled from "styled-components";

export const SecondaryButton = styled.button`
  border-width: 0px;
  padding: 10px 20px;
  height: 100%;
  display: inline-block;
  min-width: 80px;
  height: 32px;
  border-width: 1px;
  border-style: solid;
  border-radius: 100px;
  background-color: rgb(255, 255, 255);
  border-color: rgb(230, 228, 227);
  color: rgb(115, 112, 110);
  text-decoration: none;
  font-weight: 700;
  padding: 0px 15px;
  height: 100%;
  outline: currentcolor none medium;
  box-shadow: initial;
  transition: all 100ms linear 0s;
  display: flex;
  cursor: initial;
  svg {
    fill: rgb(115, 112, 110);
  }
  &:hover:not(:disabled) {
    border-color: rgb(191, 189, 187);
    cursor: pointer;
    transition: all 0s ease 0s;
  }
  line-height: 1.4;
  font-size: 18px;
  font-family: "FuturaPT", sans-serif;
  font-weight: 700;
`;
