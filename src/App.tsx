import * as React from "react";
import * as io from "socket.io-client";
import * as uuid from "uuid";

import { styled, Styled } from "theme";
import { Button, notification as noti } from "antd";
import { InputModalWithButton } from "./elements/InputModalWithButton";
import { Notification, UserGrade, NotificationInput } from "interface";
import { Register } from "./Register";

interface Props extends Styled {}
class App extends React.Component<Props> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const SERVER_PORT = 8080; // nginx
    const NAMESPACE = "notification";
    const URL = `http://localhost:${SERVER_PORT}/${NAMESPACE}`;
    const socket = io(URL);

    this.socket = socket;
    this.initSocket(socket);
    this.registerSocketHandler(socket);
  }

  initSocket = (socket: SocketIOClient.Socket) => {
    const JOIN_ROOM = "join room";
    const grade = "SILVER";

    socket.emit(JOIN_ROOM, grade);
  };

  registerSocketHandler = (socket: SocketIOClient.Socket) => {
    socket.on("notification", (notification: Notification) => {
      noti.open({
        message: notification.title,
        description: notification.message
      });
    });
  };

  notice = () => {
    const testData: NotificationInput = {
      key: uuid(),
      createAt: new Date(),
      title: "test Data",
      message:
        "이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. ",
      userGrades: [UserGrade.SILVER],
      importance: 100
    };

    this.socket.emit("notification", testData);
  };

  onSubmit = (value: NotificationInput) => {
    this.socket.emit("notification", value);
  };

  render() {
    return (
      <div className={this.props.className}>
        현재 연결된 계정 정보 : <br />
        <Button type="primary" onClick={() => this.notice()}>
          notice
        </Button>
        <InputModalWithButton onSubmit={this.onSubmit} />
        
        <Register />
      </div>
    );
  }
}

const styledApp = styled(App)`
  margin: 10rem;
`;

export { styledApp as App };
