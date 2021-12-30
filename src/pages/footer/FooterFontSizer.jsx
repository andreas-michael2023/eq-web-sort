import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const FooterFontSizer = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const cardFontSize = useStore((state) => state.cardFontSize);
  const setCardFontSize = useStore((state) => state.setCardFontSize);

  const fontSizeText = ReactHtmlParser(decodeHTML(langObj.fontSizeText));

  const increaseFontSize = () => {
    const currentSize = cardFontSize;
    const newSize = currentSize + 1;
    setCardFontSize(newSize);
  };
  const decreaseFontSize = () => {
    const currentSize = cardFontSize;
    const newSize = currentSize - 1;
    setCardFontSize(newSize);
  };

  return (
    <Container>
      <SpanDiv>{fontSizeText}</SpanDiv>
      <SizeButton padBottom={"0.4em"} onClick={decreaseFontSize}>
        -
      </SizeButton>
      <SizeButton padBottom={"0.25em"} onClick={increaseFontSize}>
        +
      </SizeButton>
    </Container>
  );
};

export default view(FooterFontSizer);

const SizeButton = styled.button`
  background: #337ab7;
  border-color: #2e6da4;
  color: white;
  font-size: 1.4em;
  font-weight: bold;
  margin: 0 3px 0 3px;
  padding: 0.25em 0.5em;
  padding-bottom: ${(props) => props.padBottom};
  height: 30px;
  width: 35px;

  border-radius: 3px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SpanDiv = styled.div`
  font-size: 16px;
`;
