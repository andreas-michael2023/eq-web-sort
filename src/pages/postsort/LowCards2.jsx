// import state from "../../store";
import React, { Component } from "react";
import getPostSortCardStyleHigh from "./getPostSortCardStyleHigh";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

/* eslint react/prop-types: 0 */

// const styles = {
//   container: {
//     width: '80%',
//     border: `2px solid black`,
//     marginTop: 50,
//     marginLeft: '10%',
//     borderRadius: `3px`,
//   },
//   cardAndTextHolder: {
//     display: `flex`,
//     alignContent: `center`,
//     background: `#7e7e7e`,
//   },
//   textHolder: {
//     marginTop: 5,
//     flexGrow: 5,
//   },
//   cardTag: {
//     width: `100%`,
//     background: `lightpink`,
//     color: `black`,
//     textAlign: `center`,
//   },
// };

// LowCards example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

class LowCards2 extends Component {
  // on blur, get text and add comment to card object
  onBlur = (event, columnStatements, columnDisplay, itemId) => {
    const cards = [...columnStatements.vCols[columnDisplay]];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;

    const identifier = `${columnDisplay}_Card${itemId + 1}`;

    // pull in state object for comments
    const statementCommentsObj =
      JSON.parse(localStorage.getItem("statementCommentsObj")) || {};

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
        statementCommentsObj[identifier] = `${el.id}>>>${comment}`;
      }
      return el;
    });

    columnStatements.vCols[columnDisplay] = [...cards];

    localStorage.setItem(
      "statementCommentsObj",
      JSON.stringify(statementCommentsObj)
    );

    localStorage.setItem("columnStatements", JSON.stringify(columnStatements));
  }; // end onBlur

  render() {
    const {
      height,
      width,
      columnDisplay,
      lowCards2,
      columnStatements,
      disagreeObj,
    } = this.props;
    const { disagreeText, placeholder } = disagreeObj;

    return lowCards2.map((item, index) => (
      <Container key={item.statement}>
        <CardTag>{disagreeText}</CardTag>
        <CardAndTextHolder>
          <div style={getPostSortCardStyleHigh(height, width)}>
            {item.statement}
          </div>
          <TagContainerDiv>
            <CommentArea
              data-gramm_editor="false"
              id={item.id}
              className="commentTextArea"
              placeholder={placeholder}
              defaultValue={item.comment}
              onBlur={(e) => {
                this.onBlur(e, columnStatements, columnDisplay, index);
              }}
            />
          </TagContainerDiv>
        </CardAndTextHolder>
      </Container>
    ));
  }
}

export default view(LowCards2);

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
  margin-top: 50px;
  border-radius: 3px;
`;

const CardTag = styled.div`
  width: 100%;
  background: lightpink;
  color: black;
  text-align: center;
`;

const CardAndTextHolder = styled.div`
  display: flex;
  align-content: center;
  background: #7e7e7e;
  width: 90vw;
  max-width: 900px;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  background-color: whitesmoke;
  min-height: 120px;
  width: calc(100% - 10px);
`;

const TagContainerDiv = styled.div`
  padding-top: 3px;
  width: 100%;
`;