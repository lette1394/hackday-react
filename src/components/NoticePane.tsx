import * as React from "react";
import { Button, message } from "antd";
import {
  NotificationInput,
  UserGrade,
  NotificationImportance
} from "interface";
import * as uuid from "uuid";
import { styled, Styled } from "theme";

interface NoticePaneContext {
  grade: UserGrade;
  importance: NotificationImportance;
}

interface Props extends Styled {
  getSocket: Function;
}
class NoticePane extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  notice = (context: NoticePaneContext) => {
    if (!this.props.getSocket()) {
      message.error("먼저 로그인 해주세요.");
      return;
    }
    const { grade, importance } = context;
    const testData: NotificationInput = {
      key: uuid(),
      createAt: new Date(),
      title: `${grade} 대상 공지`,
      message: `${grade}에게 발송되는 공지입니다.`,
      userGrades: [grade],
      importance
    };

    const EVENT = "notification";
    this.props.getSocket().emit(EVENT, testData);
  };

  getButtonContextList = () => {
    const getListOfEnum = (e) =>
      Object.keys(e).filter((k) => typeof e[k as any] === "string");

    const grades = getListOfEnum(UserGrade);
    const importances = getListOfEnum(NotificationImportance);
    let buttonList = [];

    for (let grade of grades) {
      for (let importance of importances) {
        buttonList.push({
          grade,
          importance,
          name: `${grade}-${importance}`
        });
      }
      buttonList.push("split");
    }

    return buttonList;
  };

  render() {
    return (
      <div className={this.props.className}>
        {this.getButtonContextList().map((context, idx) => {
          if (context === "split") {
            return <div key={idx} />;
          }
          return (
            <Button
              key={idx}
              type="default"
              onClick={() => this.notice(context)}
            >
              {context.name}
            </Button>
          );
        })}
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
