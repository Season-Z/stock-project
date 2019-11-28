import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import PageHeader from '@/components/PageHeader';

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

  const pagination = {};

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <Table columns={columns} dataSource={[]} rowKey="_id" pagination={pagination} />
    </Fragment>
  );
}

Storage.propTypes = {
  route: PropTypes.object,
};

export default Storage;
