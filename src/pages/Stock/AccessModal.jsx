import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, InputNumber, Button } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function AccessModal(props) {
  const { getFieldDecorator, validateFields } = props.form;
  const { visible, modalParams, loading, saveModal, handleCancel } = props;
  const { _id: id, productName, productCount, type } = modalParams;

  const handleOk = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }

      saveModal({ ...values, type });
    });
  };
  const name = type === 'storage' ? '入' : '出';
  const num = type === 'storage' ? '增加' : '减少';
  return (
    <Modal
      title={`产品${name}库`}
      visible={visible}
      width={400}
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
        <Form.Item label="id" style={{ display: 'none' }}>
          {getFieldDecorator('_id', { initialValue: id })(<Input />)}
        </Form.Item>
        <Form.Item label="产品名称">
          {getFieldDecorator('productName', {
            initialValue: productName,
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="库存数量">
          {getFieldDecorator('productCount', {
            initialValue: productCount,
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label={`${name}库的数量`} help={`要${num}的数量`}>
          {getFieldDecorator('count')(<InputNumber min={0} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

AccessModal.propTypes = {
  form: PropTypes.object,
  handleCancel: PropTypes.func,
  loading: PropTypes.bool,
  modalParams: PropTypes.object,
  saveModal: PropTypes.func,
  visible: PropTypes.bool,
};

export default Form.create()(AccessModal);
