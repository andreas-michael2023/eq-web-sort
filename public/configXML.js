const configXML = {
  horiCardMinHeight: 50,
  totalStatements: 30,
  headerColorsArray: [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ],
  columnHeadersColorsArray: [
    "#ffcbcb",
    "#ffd8d8",
    "#ffe5e5",
    "#f5f5f5",
    "#d6f5d6",
    "#c1f0c1",
    "#adebad",
  ],
  columnColorsArray: [
    "whitesmoke",
    "whitesmoke",
    "whitesmoke",
    "whitesmoke",
    "whitesmoke",
    "whitesmoke",
    "whitesmoke",
  ],
  sortCharacteristics: {
    qSortPattern: [3, 4, 5, 6, 5, 4, 3],
    qSortHeaders: ["N3", "N2", "N1", 0, 1, 2, 3],
    forcedSorts: true,
    qSortHeaderNumbers: ["-3", "-2", "-1", "0", "+1", "+2", "+3"],
  },
  out: true,
  titleText: "Post-Sort Comments",
  instructionsText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae tristique eros. Nullam laoreet varius massa ac finibus. Nullam eget lobortis dolor. Praesent enim risus, hendrerit at dui eu, facilisis maximus nibh. Quisque pharetra ante sit amet nulla facilisis, quis faucibus ex mollis. Morbi molestie mi id justo tincidunt dapibus.",
  nextButtonText: "Next",
  agreeObj: {
    agreeText: "Agree",
    columnDisplay: ["column3"],
    columnDisplay2: ["column2"],
    displaySecondColumn: true,
    placeholder: "Click here to add comment",
  },
  neutralObj: {
    displayNeutralObjects: true,
    neutralText: "Neutral",
    columnDisplay: ["column0"],
    placeholder: "Click here to add comment",
  },
  disagreeObj: {
    disagreeText: "Disagree",
    columnDisplay: ["columnN3"],
    columnDisplay2: ["columnN2"],
    displaySecondColumn: true,
    placeholder: "Click here to add comment",
  },
  columnWidth: 200,
  cardHeight: 150,
};

window.configXML = configXML;
