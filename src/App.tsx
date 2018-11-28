import * as React from "react";
import * as io from "socket.io-client";
import { styled, Styled } from "theme";
import { Button } from "antd";

interface Props extends Styled {}
interface State {
  msg: string;
  i: number;
}
class App extends React.Component<Props, State> {
  socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);
    this.state = {
      msg: "",
      i: 0
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
    this.socket.emit("message", `hello${this.state.i}`);
    this.setState({ i: this.state.i + 1 });
  };

  notice = () => {
    this.socket.emit("NOTICE", `${this.state.i + 100}`);
    this.setState({ i: this.state.i + 1 });
  };

  render() {
    return (
      <div className={this.props.className}>
        sending message... <br />
        <Button type="primary" onClick={() => this.click()}>
          send
        </Button>
        <Button type="primary" onClick={() => this.notice()}>
          notice
        </Button>
        <div>from server : {this.state.msg}</div>
        <span style={{ fontSize: "10rem" }}>안녕하세요 한글테스트 </span>
      </div>
    );
  }
}

const styledApp = styled(App)`
  margin: 10rem;
`;

export { styledApp as App };
