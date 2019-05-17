import React, { Component } from "react"
import { Form, Icon, Input, Button, Modal } from 'antd'
import '../Style/GroupModal.css'

const GroupModal = Form.create({ name: 'group_modal' })(
  class extends Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create Group"
          onCancel={onCancel}
          footer={null}
          centered
        >
          <Form onSubmit={onCreate} className="group-modal-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{required: true, message: 'Please input a name'}],
                })(
              <Input prefix={<Icon className="icon" type="user" />} placeholder="Name" />
                )}
            </Form.Item>
            <Button htmlType="submit">Save</Button>
          </Form>
        </Modal>
      );
    }
  }
);

const WrappedGroupModal = Form.create()(GroupModal)

export default WrappedGroupModal
