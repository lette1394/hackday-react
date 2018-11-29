import { Button, Modal, Form, Input, Radio } from "antd";
import * as React from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";
import styled, { Styled } from "theme";
import { NotificationImportance, Notification } from "interface";
import { CheckboxWithAll } from "elements";
const FormItem = Form.Item;

interface FormProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
  form: WrappedFormUtils;
}

const CreateForm = Form.create()(
  class extends React.Component<FormProps, any> {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="새로운 공지 보내기"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          destroyOnClose={true}
        >
          <Form layout="vertical">
            <FormItem label="제목">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "제목을 입력해주세요"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="내용">
              {getFieldDecorator("message")(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="radio-">
              {getFieldDecorator("modifier", {
                initialValue: NotificationImportance.MEDIUM
              })(
                <Radio.Group>
                  {Object.keys(NotificationImportance)
                    .filter(
                      (key) => !isNaN(Number(NotificationImportance[key]))
                    )
                    .map((key) => (
                      <Radio key={key} value={`${key}`}>
                        {key}
                      </Radio>
                    ))}
                </Radio.Group>
              )}
            </FormItem>
            <FormItem className="radio-">
              {getFieldDecorator("target", {
                initialValue: []
              })(<CheckboxWithAll plainOptions={["a", "b"]} />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

interface Props extends Styled {
  onSubmit: (value: Notification) => void;
}

class InputModalWithButton extends React.Component<Props> {
  formRef: any;

  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form: WrappedFormUtils = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      this.props.onSubmit(values);
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className={this.props.className}>
        <Button type="primary" onClick={this.showModal}>
          새로운 공지
        </Button>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
const styledInputModalWithButton = styled(InputModalWithButton)``;

export { styledInputModalWithButton as InputModalWithButton };
