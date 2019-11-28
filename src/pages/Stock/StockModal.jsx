import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, InputNumber } from 'antd';
import CreateProductForm from '@/components/CreateProductForm';

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

function StockModal(props) {
  const productForm = useRef(null);
  const { getFieldDecorator, validateFields } = props.form;
  const { visible, modalParams, saveModal, handleCancel } = props;
  const { id, productCount } = modalParams;

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
      <CreateProductForm
        modalParams={modalParams}
        wrappedComponentRef={productForm}
        render={() => {
          return (
            <Fragment>
              <Form.Item label="id" style={{ display: 'none' }}>
                {getFieldDecorator('id', { initialValue: id })(<Input />)}
              </Form.Item>
              <Form.Item label="库存数量">
                {getFieldDecorator('productCount', {
                  initialValue: productCount,
                })(<InputNumber disabled />)}
              </Form.Item>
            </Fragment>
          );
        }}
      />
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
