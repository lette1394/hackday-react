import * as React from "react";
import { Title } from "theme/component";
import styled from "theme";

const Status = ({ user, className }) => {
  return (
    <div className={className}>
      <Title>현재 연결된 계정 정보</Title>

      {Object.keys(user).map((key) => (
        <div key={key}>
          <span className="item">
            {key} : {user[key]}
          </span>
        </div>
      ))}
    </div>
  );
};

const styledStatus = styled(Status)`
  flex: 0 1 auto;

  min-width: 400px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;

  padding: 30px;
  /* margin: 20px; */

  .item {
    font-size: 20px;
  }
`;

export { styledStatus as Status };
