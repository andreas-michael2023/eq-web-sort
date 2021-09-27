import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState.js";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString.js";

const SurveyTextAreaElement = (props) => {
  let isRequired = props.opts.required;
  if (isRequired === "true") {
    isRequired = true;
  }
  console.log("isRequired", isRequired);

  useEffect(() => {
    const results = getGlobalState("resultsSurvey");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("resultsSurvey", results);
  }, [props]);

  // let savedTextAreaText;
  const [userText, setUserText] = useState("");
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("resultsSurvey");
    const id = `qNum${props.opts.qNum}`;

    let value = e.target.value;
    // value = value.trim();
    setUserText(value);

    // record if answered or not
    if (value.length > 0) {
      requiredAnswersObj[id] = "answered";
      let sanitizedText = sanitizeString(value);
      results[`qNum${props.opts.qNum}`] = sanitizedText;
    } else {
      requiredAnswersObj[id] = "no response";
      results[`qNum${props.opts.qNum}`] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
    setGlobalState("resultsSurvey", results);
  };

  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  /* 
  let bgColor;
  let border; */

  console.log(checkRequiredQuestionsComplete);
  console.log(userText.length);
  console.log(props.opts.required);

  /*
  if (
    checkRequiredQuestionsComplete === true &&
    userText.length === 0 &&
    isRequired === true
  ) {
    bgColor = "lightpink";
    border = "3px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }
  */

  useEffect(() => {
    console.log("entered useEffect");
    if (
      checkRequiredQuestionsComplete === true &&
      isRequired === true &&
      userText.length < 1
    ) {
      console.log("set pink");
      setFormatOptions({
        bgColor: "lightpink",
        border: "3px dashed black",
      });
    } else {
      console.log("set white");
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, userText, isRequired]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const placeholder = props.opts.placeholder;
  console.log(formatOptions.bgColor);
  console.log(formatOptions.border);
  console.log(userText);

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>{labelText}</TitleBar>
      <TextAreaInput
        value={userText || ""}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </Container>
  );
};

export default view(SurveyTextAreaElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: whitesmoke;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const TextAreaInput = styled.textarea`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 0px;
  height: 150px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;
  padding: 5px;
`;
