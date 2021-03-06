import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import CommonSearch from '@/components/CommonSearch';
import request from '@/utils/request';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (t, r, i) => i + 1,
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    render: (t, r) => {
      return r.products && r.products.productName;
    },
  },
  {
    title: '库存数量（总量）',
    dataIndex: 'productCount',
    key: 'productCount',
    render: (t, r) => {
      return r.products && r.products.productCount;
    },
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
    /* eslint react-hooks/exhaustive-deps: "off" */
  }, [pages.pageNo, pages.pageSize]);

  async function queryData(values) {
    setPages(state => ({ ...state, loading: true }));
    const params = { ...values, pageNo: pages.pageNo, pageSize: pages.pageSize, isStorage: false };
    const result = await request.get('/api/log/list', { params });
    const { data, count } = result.data;

    setPages(state => ({ ...state, count, data, loading: false }));
  }

  const userCallback = useCallback(value => queryData({ username: value }), []);

  const dateCallback = useCallback(value => queryData(value), []);

  const pagination = {
    current: pages.pageNo,
    total: pages.count,
    pageSize: pages.pageSize,
    onChange: val => setPages(state => ({ ...state, pageNo: val })),
    onShowSizeChange: (page, size) => setPages(state => ({ ...state, pageNo: 1, pageSize: size })),
    pageSizeOptions: ['10', '20', '40'],
    showSizeChanger: true,
    showTotal: total => `共 ${total} 条数据`,
  };

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <CommonSearch userCallback={userCallback} dateCallback={dateCallback} />
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
