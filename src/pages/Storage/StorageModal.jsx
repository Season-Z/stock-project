import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

function StorageModal(props) {
  const { getFieldDecorator, validateFields } = props.form;
  const { visible, modalParams, saveModal, handleCancel } = props;
  const { id, productType, productName, productInCount } = modalParams;
  console.log(modalParams);

  const handleOk = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }

      saveModal(values);
    });
  };

  return (
    <Modal
      title={id ? '编辑入库' : '新增入库'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      okText="确认"
      cancelText="取消"
    >
      <Form {...formItemLayout}>
        <Form.Item label="id" style={{ display: 'none' }}>
          {getFieldDecorator('id', { initialValue: id })(<Input />)}
        </Form.Item>
        <Form.Item label="产品类别">
          {getFieldDecorator('productType', {
            initialValue: productType,
            rules: [
              {
                required: true,
                message: '请输入产品类别',
              },
            ],
          })(<Input placeholder="产品类别" />)}
        </Form.Item>
        <Form.Item label="产品名称">
          {getFieldDecorator('productName', {
            initialValue: productName,
            rules: [
              {
                required: true,
                message: '请输入产品名称',
              },
            ],
          })(<Input placeholder="产品名称" />)}
        </Form.Item>
        <Form.Item label="入库数量">
          {getFieldDecorator('productInCount', {
            initialValue: productInCount,
          })(<Input placeholder="入库数量" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

StorageModal.propTypes = {
  form: PropTypes.object,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  modalParams: PropTypes.object,
  visible: PropTypes.bool,
};

export default Form.create()(StorageModal);
