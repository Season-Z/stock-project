import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Button, Radio } from 'antd';
// eslint-disable-next-line
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function UserModal(props) {
  const { getFieldDecorator, validateFields, getFieldValue } = props.form;
  const { visible, modalParams, loading, saveModal, handleCancel } = props;
  const { _id, username, password, role } = modalParams;

  const handleOk = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }

      delete values.confirm;
      saveModal(values);
    });
  };
  const validatePassword = (rule, value, callback) => {
    const field = rule.field === 'password' ? 'confirm' : 'password';
    const fieldVal = getFieldValue(field);

    if (value && fieldVal && value !== fieldVal) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Modal
      title={`${_id ? '编辑' : '新增'}用户`}
      visible={visible}
      width={600}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          确认
        </Button>,
      ]}
    >
      <Form {...formItemLayout}>
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('id', {
            initialValue: _id,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="用户名" disabled={!!_id} />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [{ required: true, message: '请输入密码' }],
          })(<Input type="password" placeholder="密码" />)}
        </Form.Item>
        <Form.Item label="确认密码">
          {getFieldDecorator('confirm', {
            initialValue: password,
            rules: [{ required: true, message: '请确认密码' }, { validator: validatePassword }],
          })(<Input type="password" placeholder="确认密码" />)}
        </Form.Item>
        <Form.Item label="人员类型">
          {getFieldDecorator('role', {
            initialValue: role,
            rules: [{ required: true, message: '请选择人员类型' }],
          })(
            <Radio.Group>
              <Radio value={1}>管理员</Radio>
              <Radio value={2}>入库人员</Radio>
              <Radio value={3}>出库人员</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserModal.propTypes = {
  form: PropTypes.object,
  handleCancel: PropTypes.func,
  loading: PropTypes.bool,
  modalParams: PropTypes.object,
  saveModal: PropTypes.func,
  visible: PropTypes.bool,
};

export default Form.create()(UserModal);
