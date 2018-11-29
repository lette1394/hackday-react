import * as React from "react";

export const Title = (props) => (
  <div
    style={{
      textAlign: "center",
      fontSize: "30px",
      marginBottom: "20px"
    }}
  >
    <span style={{ fontFamily: "BMDoHyeon-OTF" }}>{props.children}</span>
  </div>
);
