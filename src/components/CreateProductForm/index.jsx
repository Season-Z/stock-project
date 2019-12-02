import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import UploadImg from '@/components/UploadImg';

const { TextArea } = Input;
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

class CreateProductForm extends Component {
  handleSaveProduct = () => {
    return this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      return values;
    });
  };
  setImgUrl = ({ imageId, imageUrl }) => {
    this.props.form.setFieldsValue({
      imageId,
      imageUrl,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalParams, render } = this.props;
    const { imageId, imageUrl, productType, productName, productMemo } = modalParams;

    getFieldDecorator('imageUrl', {
      initialValue: imageUrl,
    });
    return (
      <Form {...formItemLayout}>
        <Form.Item label="产品图片">
          {getFieldDecorator('imageId', {
            initialValue: imageId,
          })(<UploadImg setImgUrl={this.setImgUrl} imageUrl={imageUrl} />)}
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
          })(<Input placeholder="产品类别" allowClear />)}
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
          })(<Input placeholder="产品名称" allowClear />)}
        </Form.Item>
        <Form.Item label="产品描述">
          {getFieldDecorator('productMemo', {
            initialValue: productMemo,
          })(<TextArea rows={3} placeholder="产品描述" allowClear />)}
        </Form.Item>
        {render && render()}
      </Form>
    );
  }
}

CreateProductForm.propTypes = {
  form: PropTypes.object,
  modalParams: PropTypes.object,
};

CreateProductForm.defaultProps = {
  modalParams: {},
};

export default CreateProductForm;
