import * as React from "react";
import * as io from "socket.io-client";

interface Props {}
interface State {
  msg: string;
}
export default class App extends React.Component<Props, State> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  componentDidMount() {
    const SERVER_PORT = 9000;
    this.socket = io(`http://localhost:${SERVER_PORT}`);
    this.socket.on("reply", (msg) => {
      this.setState({ msg });
      console.log("msg");
    });
  }

  click = () => {
    this.socket.emit("message", "hello");
  };

  render() {
    return (
      <div>
        sending message... <br />
        <button onClick={() => this.click()}> send! </button>
        <div>from server : {this.state.msg}</div>
      </div>
    );
  }
}
