import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import PageHeader from '@/components/PageHeader';
import CreateProductForm from '@/components/CreateProductForm';

function CreateProduct(props) {
  const { route } = props;
  const productForm = useRef(null);

  const saveProduct = () => {
    console.log(productForm);
  };

  return (
    <div style={{ paddingRight: '25px' }}>
      <PageHeader title={route.name} />
      <CreateProductForm wrappedComponentRef={productForm} />
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
