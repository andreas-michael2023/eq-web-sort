import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

/* eslint react/prop-types: 0 */

// LowCards example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

const LowCards = (props) => {
  const configObj = getGlobalState("configObj");
  const results = getGlobalState("resultsPostsort");
  const postsortConvertObj = configObj.postsortConvertObj;

  // on blur, get text and add comment to card object
  const onBlur = (event, columnStatements, columnDisplay, itemId) => {
    const cards = [...columnStatements.vCols[columnDisplay]];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;

    const identifier = `${columnDisplay}_${itemId + 1}`;

    // pull in state object for comments
    const statementCommentsObj = getGlobalState("statementCommentsObj") || {};

    // to update just the card that changed
    cards.map((el) => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, " ");
        const comment = comment2.replace(/,/g, " ");
        // assign to main data object for confirmation / debugging
        el.comment = comment;

        // assign to comments object
        statementCommentsObj[identifier] = `(${el.id}) ${comment}`;
        results[identifier] = `(${el.id}) ${comment}`;
      }
      return el;
    });

    setGlobalState("resultsPostsort", results);

    columnStatements.vCols[columnDisplay] = [...cards];

    setGlobalState("statementCommentsObj", statementCommentsObj);

    setGlobalState("columnStatements", columnStatements);
  }; // end onBlur

  const {
    height,
    width,
    cardFontSize,
    columnDisplay,
    disagreeObj,
    lowCards,
    columnStatements,
  } = props;
  const { disagreeText, placeholder } = disagreeObj;

  const columnInfo = ` Column ${postsortConvertObj[columnDisplay]}`;

  return lowCards.map((item, index) => (
    <Container key={item.statement}>
      <CardTag cardFontSize={cardFontSize}>
        {disagreeText}
        {columnInfo}
      </CardTag>
      <CardAndTextHolder>
        <Card cardFontSize={cardFontSize} width={width} height={height}>
          {item.statement}
        </Card>
        <TagContainerDiv>
          <CommentArea
            data-gramm_editor="false"
            height={height}
            cardFontSize={cardFontSize}
            id={item.id}
            placeholder={placeholder}
            defaultValue={item.comment}
            onBlur={(e) => {
              onBlur(e, columnStatements, columnDisplay, index);
            }}
          />
        </TagContainerDiv>
      </CardAndTextHolder>
    </Container>
  ));
};

export default view(LowCards);

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
  margin-top: 50px;
  border-radius: 3px;
  border: 1px solid darkgray;
`;

const CardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: lightpink;
  color: black;
  text-align: center;
  font-size: ${(props) => `${props.cardFontSize}px`};
  height: 1.5em;
`;

const CardAndTextHolder = styled.div`
  display: flex;
  align-content: center;
  background: rgb(224, 224, 224);
  width: 90vw;
  max-width: 898px;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  margin-top: 2px;
  background-color: white;
  height: ${(props) => `${props.height}px;`};
  font-size: ${(props) => `${props.cardFontSize}px`};
  width: calc(100% - 6px);
  border: 2px solid darkgray;
  border-radius: 3px;
`;

const TagContainerDiv = styled.div`
  padding-top: 3px;
  width: 100%;
`;

const Card = styled.div`
  user-select: "none";
  padding: 0 2px 0 2px;
  margin: 5px 5px 5px 5px;
  line-height: 1em;
  height: ${(props) => `${props.height}px;`};
  width: 20vw;
  max-width: ${(props) => `${props.width}px;`};
  border-radius: 5px;
  font-size: ${(props) => `${props.cardFontSize}px`};
  display: flex;
  align-items: center;
  border: 2px solid black;
  background-color: #f6f6f6;
  text-align: center;
`;
