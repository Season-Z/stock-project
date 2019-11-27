import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
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
    title: '出库数量',
    dataIndex: 'productOutCount',
    key: 'productOutCount',
  },
];

function Delivery(props) {
  const { route } = props;

  const pagination = {};

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <Table columns={columns} dataSource={[]} rowKey="_id" pagination={pagination} />
    </Fragment>
  );
}

Delivery.propTypes = {
  route: PropTypes.object,
};

export default Delivery;
