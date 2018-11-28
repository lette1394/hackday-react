import { Checkbox } from "antd";
import * as React from "react";
import styled, { Styled } from "theme";

const CheckboxGroup = Checkbox.Group;

interface Props extends Styled {
  plainOptions: string[];
  defaultCheckedList: string[];
  onChange: (value: any) => void;
}
interface State {
  checkedList: string[];
  indeterminate: boolean;
  checkAll: boolean;
}
class CheckboxWithAll extends React.Component<Props, State> {
  state = {
    checkedList: this.props.defaultCheckedList,
    indeterminate: false,
    checkAll: false
  };

  render() {
    return (
      <div className={this.props.className}>
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={this.props.plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (checkedList: string[]) => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length &&
        checkedList.length < this.props.plainOptions.length,
      checkAll: checkedList.length === this.props.plainOptions.length
    });

    this.props.onChange(checkedList);
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.props.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
}

const styledCheckboxWithAll = styled(CheckboxWithAll)``;

export { styledCheckboxWithAll as CheckboxWithAll };
