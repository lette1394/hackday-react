import * as React from "react";
import { Button } from "antd";
import {
  NotificationInput,
  UserGrade,
  NotificationImportance
} from "./interface";
import uuid = require("uuid");
import { styled, Styled } from "./theme";

interface NoticePaneContext {
  grade: UserGrade;
  importance: NotificationImportance;
}

interface Props extends Styled {
  socket: any;
}
class NoticePane extends React.Component<Props, any> {
  notice = (context: NoticePaneContext) => () => {
    const testData: NotificationInput = {
      key: uuid(),
      createAt: new Date(),
      title: `${context.grade} 대상 공지`,
      message: `${context.grade}에게 발송되는 공지입니다. 공지내용123 공지공지`,
      userGrades: [UserGrade.SILVER],
      importance: context.importance
    };

    const EVENT = "notification";
    this.props.socket.emit(EVENT, testData);
  };

  render() {
    const grades = Object.keys(UserGrade).filter(
      (k) => typeof UserGrade[k as any] === "string"
    );
    const importances = Object.keys(NotificationImportance).filter(
      (k) => typeof NotificationImportance[k as any] === "string"
    );
    let buttonList = [];

    for (let grade of grades) {
      for (let importance of importances) {
        buttonList.push({
          grade,
          importance,
          name: `${grade}-${importance}`
        });
      }
    }
    console.log(buttonList);

    return (
      <div className={this.props.className}>
        {buttonList.map((context, idx) => (
          <Button key={idx} type="primary" onClick={() => this.notice(context)}>
            {context.name}
          </Button>
        ))}
      </div>
    );
  }
}

const styledNoticePane = styled(NoticePane)`
  flex: 0 1 auto;

  min-width: 400px;

  padding: 30px;
`;

export { styledNoticePane as NoticePane };
