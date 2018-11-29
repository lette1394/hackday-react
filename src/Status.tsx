import * as React from "react";
import { Title } from "theme/component";
import styled from "./theme";

const Status = (props) => {
  return (
    <div className={props.className}>
      <Title>현재 연결된 계정 정보</Title>
      {Object.keys(this.state.user).map((key) => (
        <div>
          {key} : {this.state.user[key]}
        </div>
      ))}
    </div>
  );
};

const styledStatus = styled(Status)`
  max-width: 400px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  position: absolute;
  left: 10rem;
  top: 10rem;
`;

export { styledStatus as Status };
