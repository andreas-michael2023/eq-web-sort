import React from "react";
import styled from "styled-components";
import NextButton from "./NextButton";
import FooterFontSizer from "./FooterFontSizer";
import CardHeightSizer from "./CardHeightSizer";
import { view } from "@risingstack/react-easy-state";
// import globalState from "../../globalState/globalState";
import ProgressBar from "@ramonak/react-progress-bar";
import getGlobalState from "../../globalState/getGlobalState";
// import setGlobalState from "../../globalState/setGlobalState";

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue((value) => value + 1); // update the state to force render
// }

const getNextPage = (currentPage) => {
  console.log(currentPage);
  if (currentPage === "landing") {
    return `/presort`;
  }
  if (currentPage === "presort") {
    return `/sort`;
  }
  if (currentPage === "sort") {
    return `/postsort`;
  }
  if (currentPage === "postsort") {
    console.log("sending to survey");
    return `/survey`;
  }
  if (currentPage === "survey") {
    return `/submit`;
  }
  if (currentPage === "submit") {
    return `/`;
  }
  return `/nopagefound`;
};

const StyledFooter = () => {
  const currentPage = getGlobalState("currentPage");
  const progressScore = getGlobalState("progressScore");
  let displayCardHeightAdj = false;
  if (currentPage === "sort") {
    displayCardHeightAdj = true;
  }
  console.log(progressScore);
  // window.onresize = useForceUpdate();

  const nextPage = getNextPage(currentPage);

  return (
    <StyledFooterDiv>
      <AdjustmentsContainer>
        <FooterFontSizer />
        {displayCardHeightAdj && <CardHeightSizer />}
      </AdjustmentsContainer>
      <ProgressBarDiv>
        <ProgressBar
          completed={progressScore}
          width={"370px"}
          bgColor="#337ab7"
          labelColor="#f0f0f0"
          baseBgColor="lightgray"
        />
      </ProgressBarDiv>
      <NextButton to={nextPage}>{window.languageXML.nextButtonText}</NextButton>
    </StyledFooterDiv>
  );
};

export default view(StyledFooter);

const StyledFooterDiv = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;

  display: inline-grid;
  grid-template-columns: 25% 1fr 25%;
  align-items: center;
`;

const AdjustmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
`;

const ProgressBarDiv = styled.div`
  justify-self: center;
`;