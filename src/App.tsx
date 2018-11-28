import * as React from "react";
import io from "socket.io";

interface Props {}
interface State {}
export default class App extends React.Component<Props, State> {
  componentDidMount() {
    const socket = io();

    const interval = setInterval(() => socket.emit("message", "hello "), 1000);

    setTimeout(() => clearInterval(interval), 5000);
  }

  render() {
    return <div>sending message...</div>;
  }
}
