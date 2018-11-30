import * as React from "react";
import * as io from "socket.io-client";
import axios from "axios";

import { styled, Styled } from "theme";
import { notification as noti } from "antd";
import { InputModalWithButton } from "elements";
import * as moment from "moment";
import { Notification, NotificationImportance, User } from "interface";
import { Register, Login, Status, NoticePane } from "components";
import { NotiHistory } from "./NotiHistory";
import { SERVER_URL, SERVER_END_POINT } from "myconstant";
import { JOIN_ROOM, NOTIFICATION, LEAVE_ROOM } from "src/myconstant/event";
import { requestNotificationHistory } from "request";

interface Props extends Styled {}
interface State {
  user: User;
  isLoaded: boolean;
  history: Notification[];
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
      },
      history: []
    };
  }

  initConnection = () => {
    const socket = io(SERVER_END_POINT);

    this.socket = socket;
    this.registerSocketHandler(socket);

    return Promise.resolve();
  };

  joinRoom = (user: User) => {
    const { grade } = user;

    this.socket.emit(JOIN_ROOM, grade);
  };

  leaveRoom = (user: User) => {
    const { grade } = user;

    this.socket.emit(LEAVE_ROOM, grade);
  };

  registerSocketHandler = (socket: SocketIOClient.Socket) => {
    const typeResolver = new Map();
    typeResolver.set(NotificationImportance.LOW, "success");
    typeResolver.set(NotificationImportance.MEDIUM, "info");
    typeResolver.set(NotificationImportance.HIGH, "warning");
    typeResolver.set(NotificationImportance.URGENT, "error");

    socket.on(NOTIFICATION, (notification: Notification) => {
      const { id, title, importance, message, createAt, grade } = notification;

      noti.open({
        key: id,
        message: title,
        description: `${message} - ${moment(createAt)
          .locale("ko")
          .fromNow()}`,
        type: typeResolver.get(importance)
      });

      this.setState({ history: [notification, ...this.state.history] });
    });
  };

  onSubmit = (value: Notification) => {
    this.socket.emit(NOTIFICATION, value);
  };

  onLogin = (user: User) => {
    this.fetch(user);

    if (this.state.isLoaded) {
      this.leaveRoom(this.state.user);
      this.joinRoom(user);
      return;
    }
    this.setState({ user });

    this.setState({ isLoaded: true });
    this.initConnection().then(() => this.joinRoom(user));
  };

  fetch = (user: User): void => {
    if (user.email === "") return;

    requestNotificationHistory(user).then((history) =>
      this.setState({ history })
    );
  };

  dismiss = (id: string): void => {
    const list = this.state.history.filter((val) => val.id !== id);
    this.setState({ history: list });

    axios.put(`${SERVER_URL}/notifications`, {
      id,
      read: true
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <Status user={this.state.user} />
        <NoticePane getSocket={() => this.socket} />
        <InputModalWithButton onSubmit={this.onSubmit} />
        <Login onLogin={this.onLogin} />
        <Register />
        <NotiHistory history={this.state.history} dismiss={this.dismiss} />
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
