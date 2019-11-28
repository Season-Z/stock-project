import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Input } from 'antd';
import PageHeader from '@/components/PageHeader';
import StockModal from './StockModal';

const { Search } = Input;
const columns = [
  {
    title: '产品图片',
    dataIndex: 'productImg',
    key: 'productImg',
  },
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
    title: '产品描述',
    dataIndex: 'productMemo',
    key: 'productMemo',
  },
  {
    title: '库存数量',
    dataIndex: 'productCount',
    key: 'productCount',
  },
];

function Stock(props) {
  const { route } = props;

  const [model, setModel] = useState({
    visible: false,
    modalParams: {},
  });

  const searchProduct = value => {
    console.log(value);
  };

  const deleteProduct = record => {
    console.log(record);
  };

  const showModal = record => setModel({ modalParams: record, visible: true });

  const handleOk = useCallback(params => {
    console.log(params);
  }, []);

  const handleCancel = useCallback(() => {
    setModel(state => ({ ...state, visible: false }));
  }, []);

  const newColumns = columns.concat({
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <Button type="primary" size="small" onClick={() => showModal(record)}>
          编辑
        </Button>
        <Popconfirm
          title="确认删除吗？"
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
    <div>
      <PageHeader title={route.name} />
      <Search
        placeholder="产品名称"
        onSearch={searchProduct}
        style={{ width: 200, marginBottom: '16px' }}
      />
      <Table columns={newColumns} dataSource={[]} rowKey="_id" pagination={pagination} />
      {model.visible && <StockModal {...model} saveModal={handleOk} handleCancel={handleCancel} />}
    </div>
  );
}

Stock.propTypes = {
  route: PropTypes.object,
};

export default Stock;
