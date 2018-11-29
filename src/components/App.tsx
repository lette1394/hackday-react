import * as React from "react";
import * as io from "socket.io-client";

import { styled, Styled } from "theme";
import { notification as noti } from "antd";
import { InputModalWithButton } from "elements";
import * as moment from "moment";
import {
  Notification,
  NotificationInput,
  NotificationImportance,
  User
} from "interface";
import { Register, Login, Status, NoticePane } from "components";

interface Props extends Styled {}
interface State {
  user: User;
  isLoaded: boolean;
}
class App extends React.Component<Props, State> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoaded: false,
      user: {
        email: "",
        nickname: "",
        grade: ""
      }
    };
  }

  initConnection = () => {
    const SERVER_PORT = 8080; // nginx
    const NAMESPACE = "notification";
    const URL = `http://localhost:${SERVER_PORT}/${NAMESPACE}`;
    const socket = io(URL);

    this.socket = socket;
    this.registerSocketHandler(socket);

    return Promise.resolve();
  };

  joinRoom = (user: User) => {
    const { grade } = user;
    const JOIN_ROOM = "join room";

    this.socket.emit(JOIN_ROOM, grade);
  };

  leaveRoom = (user: User) => {
    const { grade } = user;
    const LEAVE_ROOM = "leave room";

    this.socket.emit(LEAVE_ROOM, grade);
  };

  registerSocketHandler = (socket: SocketIOClient.Socket) => {
    const typeResolver = new Map();
    typeResolver.set("100", "success");
    typeResolver.set("200", "info");
    typeResolver.set("300", "warning");
    typeResolver.set("400", "error");

    socket.on("notification", (notification: Notification) => {
      const { key, title, importance, message, createAt } = notification;

      noti.open({
        key,
        message: title,
        description: `${message} - ${moment(createAt)
          .locale("ko")
          .fromNow()}`,
        type: typeResolver.get(importance)
      });
    });
  };

  onSubmit = (value: NotificationInput) => {
    this.socket.emit("notification", value);
  };

  onLogin = (user: User) => {
    if (this.state.isLoaded) {
      this.leaveRoom(this.state.user);
      this.joinRoom(user);
      return;
    }
    this.setState({ user });

    this.setState({ isLoaded: true });
    this.initConnection().then(() => this.joinRoom(user));
  };

  render() {
    return (
      <div className={this.props.className}>
        <Status user={this.state.user} />
        <NoticePane getSocket={() => this.socket} />

        <InputModalWithButton onSubmit={this.onSubmit} />
        <Login onLogin={this.onLogin} />
        <Register />
      </div>
    );
  }
}

const styledApp = styled(App)`
  display: flex;
  flex-wrap: wrap;

  margin: 10rem;
`;

export { styledApp as App };
