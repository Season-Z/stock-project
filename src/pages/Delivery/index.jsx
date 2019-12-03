import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import request from '@/utils/request';

const columns = [
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '库存数量（总量）',
    dataIndex: 'productCount',
    key: 'productCount',
  },
  {
    title: '出库数量',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '出库人员',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''),
  },
];

function Delivery(props) {
  const { route } = props;

  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
    loading: false,
  });

  useEffect(() => {
    queryData();
  }, [pages.pageNo, pages.pageSize]);

  async function queryData() {
    setPages(state => ({ ...state, loading: true }));
    const params = { pageNo: pages.pageNo, pageSize: pages.pageSize, isStorage: false };
    const result = await request.get('/api/log/list', { params });
    const { data, count } = result.data;

    setPages(state => ({ ...state, count, data, loading: false }));
  }

  const pagination = {
    current: pages.pageNo,
    total: pages.count,
    pageSize: pages.pageSize,
    onChange: val => setPages(state => ({ ...state, pageNo: val })),
    onShowSizeChange: (page, size) => setPages(state => ({ ...state, pageSize: size })),
    pageSizeOptions: ['10', '20', '40'],
    showSizeChanger: true,
    showTotal: total => `共 ${total} 条数据`,
  };

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <Table
        columns={columns}
        dataSource={pages.data}
        rowKey="_id"
        pagination={pagination}
        loading={pages.loading}
      />
    </Fragment>
  );
}

Delivery.propTypes = {
  route: PropTypes.object,
};

export default Delivery;
