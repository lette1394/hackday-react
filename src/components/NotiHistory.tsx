import * as React from "react";
import { List, Button } from "antd";
import { styled, Styled } from "theme";
import { Title } from "theme/component";
import { Notification } from "interface";
import * as moment from "moment";

interface Props extends Styled {
  history: Notification[];
  dismiss: (notiId: number) => void;
}
moment.locale("ko");

class NotiHistory extends React.Component<Props, any> {
  render() {
    return (
      <div className={this.props.className}>
        <Title>공지 내역</Title>
        <List
          itemLayout="horizontal"
          dataSource={this.props.history}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.message} />
              <div>[{item.importance}] </div>
              <div className="date">{moment(item.created_at).fromNow()}</div>
              <Button onClick={() => this.props.dismiss(item.id)}>
                dismiss
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const styledNotiHistory = styled(NotiHistory)`
  flex: 0 1 auto;
  margin: 20px 0;

  min-width: 800px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  padding: 40px;
`;

export { styledNotiHistory as NotiHistory };
