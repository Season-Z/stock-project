import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Divider } from 'antd';

const DetailModal = props => {
  const { visible, handleCancel, modalParams } = props;

  return (
    <Modal
      visible={visible}
      title="产品详情"
      width={870}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>,
      ]}
    >
      <Row gutter={16}>
        <Col span={12}>
          <img src={modalParams.imageUrl} alt="product" style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <h2>
            {modalParams.productName}
            <span style={{ fontWeight: 'normal', fontSize: '12px' }}>
              （{modalParams.productType}）
            </span>
          </h2>
          <Divider />
          <p>{modalParams.productMemo}</p>
        </Col>
      </Row>
    </Modal>
  );
};

DetailModal.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  modalParams: PropTypes.object,
};

export default DetailModal;
