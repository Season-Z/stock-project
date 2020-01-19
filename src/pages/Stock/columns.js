import React from 'react';
import moment from 'moment';

export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: '6%',
    render: (t, r, i) => i + 1,
  },
  {
    title: '产品图片',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: '15%',
    render: text =>
      text ? (
        <img src={text} alt="产品图片" style={{ maxWidth: '200px', maxHeight: '120px' }} />
      ) : (
        ''
      ),
  },
  {
    title: '产品类别',
    dataIndex: 'productType',
    key: 'productType',
    width: '10%',
    sorter: true,
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    width: '15%',
  },
  {
    title: '产品描述',
    dataIndex: 'productMemo',
    key: 'productMemo',
    width: '15%',
  },
  {
    title: '库存数量',
    dataIndex: 'productCount',
    key: 'productCount',
    width: '10%',
  },
  {
    title: '创建人',
    dataIndex: 'username',
    key: 'username',
    width: '10%',
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: '15%',
    render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''),
  },
];
