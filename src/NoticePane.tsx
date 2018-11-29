import * as React from "react";
import { Button } from "antd";
import {
  NotificationInput,
  UserGrade,
  NotificationImportance
} from "./interface";
import uuid = require("uuid");
import { styled } from "./theme";

interface NoticePaneContext {
  grade: UserGrade;
  importance: NotificationImportance;
}

interface Props {
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
    const buttonList = [
      {
        grade: UserGrade.BRONZE,
        importance: NotificationImportance.LOW,
        name: "bronze-low"
      }
    ];
    return buttonList.map((context) => (
      <Button type="primary" onClick={() => this.notice(context)}>
        {context.name}
      </Button>
    ));
  }
}

const styledNoticePane = styled(NoticePane)`
  flex: 0 1 auto;

  min-width: 400px;
`;

export { styledNoticePane as NoticePane };
