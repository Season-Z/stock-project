import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, InputNumber } from 'antd';
import UploadImg from '@/components/UploadImg';

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
const { TextArea } = Input;

function StockModal(props) {
  const { getFieldDecorator, validateFields } = props.form;
  const { visible, modalParams, saveModal, handleCancel } = props;
  const { id, productImg, productType, productName, productCount } = modalParams;

  const handleOk = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }

      saveModal(values);
    });
  };

  const setImgUrl = url => {};

  return (
    <Modal
      title={id ? '编辑产品' : '新增产品'}
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
        <Form.Item label="产品图片">
          {getFieldDecorator('productImg', {
            initialValue: productImg,
          })(<UploadImg setImgUrl={setImgUrl} />)}
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
        <Form.Item label="产品描述">
          {getFieldDecorator('productCount', {
            initialValue: productCount,
          })(<TextArea rows={3} placeholder="产品描述" />)}
        </Form.Item>
        <Form.Item label="库存数量">
          {getFieldDecorator('productCount', {
            initialValue: productCount,
          })(<InputNumber disabled />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

StockModal.propTypes = {
  form: PropTypes.object,
  handleCancel: PropTypes.func,
  modalParams: PropTypes.object,
  saveModal: PropTypes.func,
  visible: PropTypes.bool,
};

export default Form.create()(StockModal);
