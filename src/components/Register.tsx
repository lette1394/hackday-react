import * as React from "react";
import { Form, Icon, Input, Button, message, Radio } from "antd";
import { styled } from "theme";
import axios from "axios";
import { Title } from "theme/component";

const FormItem = Form.Item;

const SERVER_URL = "http://localhost:8999";

class Register extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }
      const { email, nickname, grade } = values;

      axios
        .post(`${SERVER_URL}/register`, {
          email,
          nickname,
          grade
        })
        .then(() => message.success("성공", 2))
        .catch(() => message.error("중복", 2));
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className={this.props.className}>
        <Title>사용자 추가</Title>
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
          {getFieldDecorator("nickname", {
            rules: [{ required: true, message: "닉네임을 입력해주세요" }]
          })(
            <Input
              prefix={
                <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="닉네임"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("grade", {
            rules: [{ required: true, message: "등급 선택 필요" }]
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button key={"BRONZE"} value="BRONZE">
                BRONZE
              </Radio.Button>
              <Radio.Button key={"SILVER"} value="SILVER">
                SILVER
              </Radio.Button>
              <Radio.Button key={"GOLD"} value="GOLD">
                GOLD
              </Radio.Button>
              <Radio.Button key={"PLATINUM"} value="PLATINUM">
                PLAT
              </Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const styledRegister = styled(Register)`
  flex: 0 1 auto;

  border: 1px solid #e8e8e8;
  border-radius: 20px;

  min-width: 400px;
  float: right;
  padding: 50px !important;

  .login-form-button {
    width: 100%;
  }
`;
const WrappedRegister = Form.create()(styledRegister);

export { WrappedRegister as Register };
