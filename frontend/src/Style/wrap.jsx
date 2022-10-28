import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const Wrapper = styled((props) => (
  <Container componentsProps={{ thumb: { className: "main" } }} {...props} />
))`
textAlign: "center",
display: "flex",
alignItems: "center",
justifyContent: "center",
Typography: {
  margin: "0 auto",
  color: "#fff",
},
`;

export default Wrapper;
