import * as React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { styled, Styled } from "theme";
import axios from "axios";
import { Title } from "theme/component";
import { SERVER_URL } from "myconstant";

const FormItem = Form.Item;

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
        .then((res) => {
          message.success("성공", 2);
          this.props.onLogin(res.data);
        })
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
  flex: 0 1 auto;

  border: 1px solid #e8e8e8;
  border-radius: 20px;

  min-width: 400px;
  padding: 50px !important;

  .login-form-button {
    width: 100%;
  }
`;
const WrappedLogin: any = Form.create()(styledLogin);

export { WrappedLogin as Login };
