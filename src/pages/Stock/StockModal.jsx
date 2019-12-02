import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, InputNumber, Button } from 'antd';
import CreateProductForm from '@/components/CreateProductForm';

function StockModal(props) {
  const productForm = useRef(null);
  const { getFieldDecorator, validateFields } = props.form;
  const { visible, modalParams, loading, saveModal, handleCancel } = props;
  const { _id: id, productCount } = modalParams;

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
      title={id ? '编辑产品' : '新增产品'}
      visible={visible}
      width={800}
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
      <CreateProductForm
        form={props.form}
        modalParams={modalParams}
        wrappedComponentRef={productForm}
        render={() => {
          return (
            <Fragment>
              <Form.Item label="id" style={{ display: 'none' }}>
                {getFieldDecorator('_id', { initialValue: id })(<Input />)}
              </Form.Item>
              <Form.Item label="库存数量">
                {getFieldDecorator('productCount', {
                  initialValue: productCount,
                })(<InputNumber min={0} />)}
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
