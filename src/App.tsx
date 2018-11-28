import * as React from "react";
import * as io from "socket.io-client";
import { styled, Styled } from "theme";
import { Button, notification as noti } from "antd";
import { InputModalWithButton } from "./elements/InputModalWithButton";
import { Notification } from "interface";
import { PostNotificationData } from "./interface/Notification";

interface Props extends Styled {}
class App extends React.Component<Props> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const SERVER_PORT = 9000;
    this.socket = io(`http://localhost:${SERVER_PORT}`);
    this.socket.on("NOTICE", (msg) => {
      this.setState({ msg });
      console.log("msg");
    });

    this.registerSocketHandler(this.socket);
  }

  registerSocketHandler = (socket: SocketIOClient.Socket) => {
    socket.on("NOTIFICATION", (notification: Notification) => {
      noti.open({
        message: notification.title,
        description: notification.message
      });
    });
  };

  notice = () => {
    const testData: PostNotificationData = {
      title: "test Data",
      message:
        "이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. 이건 메시지입니다 이건 메시지입니다. ",
      target: 1000,
      importance: 100
    };

    this.socket.emit("NOTIFICATION", testData);
  };

  onSubmit = (value: PostNotificationData) => {
    this.socket.emit("NOTIFICATION", value);
  };

  render() {
    return (
      <div className={this.props.className}>
        테스트 <br />
        <Button type="primary" onClick={() => this.notice()}>
          notice
        </Button>
        <InputModalWithButton onSubmit={this.onSubmit} />
        <span style={{ fontSize: "10rem" }}>안녕하세요 한글테스트 </span>
      </div>
    );
  }
}

const styledApp = styled(App)`
  margin: 10rem;
`;

export { styledApp as App };
