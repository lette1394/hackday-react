import * as React from "react";
import * as io from "socket.io-client";
import * as uuid from "uuid";

import { styled, Styled } from "theme";
import { Button, notification as noti } from "antd";
import { InputModalWithButton } from "./elements/InputModalWithButton";
import { Notification, UserGrade, NotificationInput } from "interface";
import { Register } from "./Register";
import { Title } from "theme/component";
import { Login } from "./Login";
import { User } from "./interface/User";
import { Status } from "./Status";
import { NoticePane } from "./NoticePane";

interface Props extends Styled {}
interface State {
  user: User;
}
class App extends React.Component<Props, State> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);

    this.state = {
      user: {
        email: "",
        nickname: "",
        grade: ""
      }
    };
  }

  initConnection = (user: User) => {
    const SERVER_PORT = 8080; // nginx
    const NAMESPACE = "notification";
    const URL = `http://localhost:${SERVER_PORT}/${NAMESPACE}`;
    const socket = io(URL);

    this.socket = socket;
    this.initSocket(user);
    this.registerSocketHandler(socket);
  };

  initSocket = (user: User) => {
    const { grade } = user;
    const JOIN_ROOM = "join room";

    this.socket.emit(JOIN_ROOM, grade);
  };

  registerSocketHandler = (socket: SocketIOClient.Socket) => {
    socket.on("notification", (notification: Notification) => {
      noti.open({
        message: notification.title,
        description: notification.message
      });
    });
  };

  onSubmit = (value: NotificationInput) => {
    this.socket.emit("notification", value);
  };

  onLogin = (user: User) => {
    this.setState({ user });
    this.initConnection(user);

    console.log(user);
  };

  render() {
    return (
      <div className={this.props.className}>
        <Status user={this.state.user} />
        <NoticePane socket={this.socket} />

        <InputModalWithButton onSubmit={this.onSubmit} />
        <Login onLogin={this.onLogin} />
        <Register />
      </div>
    );
  }
}

const styledApp = styled(App)`
  display: flex;

  margin: 10rem;
`;

export { styledApp as App };
