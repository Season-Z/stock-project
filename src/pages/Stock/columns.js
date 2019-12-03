import React from 'react';
export const columns = [
  {
    title: '产品图片',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: '20%',
    render: text => (text ? <img src={text} alt="avatar" style={{ height: '120px' }} /> : ''),
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    width: '15%',
  },
  {
    title: '产品类别',
    dataIndex: 'productType',
    key: 'productType',
    width: '10%',
  },
  {
    title: '产品描述',
    dataIndex: 'productMemo',
    key: 'productMemo',
    width: '20%',
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
];
