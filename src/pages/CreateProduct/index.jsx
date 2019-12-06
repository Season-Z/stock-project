import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'antd';
import PageHeader from '@/components/PageHeader';
import CreateProductForm from '@/components/CreateProductForm';
import request from '@/utils/request';

function CreateProduct(props) {
  const { route, history } = props;
  const productForm = useRef(null);

  const saveProduct = async () => {
    const values = await productForm.current.handleSaveProduct();
    await request.post('/api/product/save', values);

    Modal.confirm({
      title: '新增产品成功',
      content: '是否继续添加产品？',
      okText: '继续添加',
      cancelText: '前往产品列表',
      onCancel: () => history.push('/stock'),
      onOk: () => (window.location.href = '/createProduct'),
    });
  };

  return (
    <div style={{ paddingRight: '25px' }}>
      <PageHeader title={route.name} />
      <CreateProductForm form={props.form} ref={productForm} />
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={saveProduct}>
          保存
        </Button>
      </div>
    </div>
  );
}

CreateProduct.propTypes = {
  route: PropTypes.object,
};

export default Form.create()(CreateProduct);
