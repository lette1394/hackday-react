import * as React from "react";
import { Form, Icon, Input, Button, message, Radio } from "antd";
import { styled } from "./theme";
import axios from "axios";
import { Title } from "theme/component";

const FormItem = Form.Item;

const SERVER_URL = "http://localhost:8999";

class Login extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }
      const { email } = values;

      axios
        .post(`${SERVER_URL}/login`, {
          email
        })
        .then(() => message.success("성공", 2))
        .catch(() => message.error("실패", 2));
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className={this.props.className}>
        <Title>로그인</Title>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "이메일 입력해주세요" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="이메일"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const styledLogin = styled(Login)`
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  position: absolute;
  right: 10rem;
  top: 10rem;

  max-width: 400px;
  float: right;
  padding: 50px !important;

  .login-form-button {
    width: 100%;
  }
`;
const WrappedLogin = Form.create()(styledLogin);

export { WrappedLogin as Login };
