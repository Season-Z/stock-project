import React, { Component, useCallback, useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import UploadImg from '@/components/UploadImg';
import PageHeader from '@/components/PageHeader';
import request from '@/utils/request';

const { TextArea } = Input;

@Form.create()
class FormPart extends Component {
  handleSaveProduct = () =>
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.saveProduct(values);
    });

  setImgUrl = ({ imageUrl }) => {
    this.props.form.setFieldsValue({
      imageUrl,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl } = this.props;

    return (
      <Form>
        <Form.Item label="产品图片" help="上传的图片应小于1M">
          {getFieldDecorator('imageUrl', {
            rules: [{ required: true, message: '请输入产品名称' }],
          })(<UploadImg setImgUrl={this.setImgUrl} imageUrl={imageUrl} />)}
        </Form.Item>
        <Form.Item label="产品名称">
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: '请输入产品名称' }],
          })(<Input placeholder="产品名称" />)}
        </Form.Item>
        <Form.Item label="产品类型">
          {getFieldDecorator('productType', {
            rules: [{ required: true, message: '请输入产品类别' }],
          })(<Input placeholder="产品类型" />)}
        </Form.Item>
        <Form.Item label="产品描述">
          {getFieldDecorator('productMemo', {
            rules: [{ required: true, message: '请输入产品类别' }],
          })(<TextArea rows={3} placeholder="产品描述" />)}
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={this.handleSaveProduct}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default function HomeEnd(props) {
  const { route } = props;
  const [loading, setLoading] = useState(false);

  const saveProduct = useCallback(async values => {
    try {
      setLoading(true);
      await request.post('/api/viewPro/save', values);

      message.success('新增成功');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <PageHeader title={route.name} />
      <FormPart saveProduct={saveProduct} />
    </Spin>
  );
}
