import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import PageHeader from '@/components/PageHeader';
import StorageModal from './StorageModal';

const columns = [
  {
    title: '产品类别',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '入库数量',
    dataIndex: 'productInCount',
    key: 'productInCount',
  },
];

function Storage(props) {
  const { route } = props;

  const [model, setModel] = useState({
    visible: false,
    modalParams: {},
  });

  function deleteProduct({ id }) {
    console.log(id);
  }

  const handleOk = useCallback(params => {
    console.log(params);
  }, []);

  const handleCancel = useCallback(() => {
    setModel(state => ({ ...state, visible: false }));
  }, []);

  const showModal = () => setModel({ modalParams: {}, visible: true });

  const newColumns = columns.concat({
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <Button type="primary" size="small">
          编辑
        </Button>
        <Popconfirm
          title="确认移除吗？"
          onConfirm={() => deleteProduct(record)}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="danger">
            删除
          </Button>
        </Popconfirm>
      </Fragment>
    ),
  });

  const pagination = {};

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
        新增入库产品
      </Button>
      <Table columns={newColumns} dataSource={[]} rowKey="_id" pagination={pagination} />
      {model.visible && (
        <StorageModal {...model} saveModal={handleOk} handleCancel={handleCancel} />
      )}
    </Fragment>
  );
}

Storage.propTypes = {
  route: PropTypes.object,
};

export default Storage;
