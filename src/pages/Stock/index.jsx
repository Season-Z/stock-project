import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Input, message } from 'antd';
import PageHeader from '@/components/PageHeader';
import StockModal from './StockModal';
import request from '@/utils/request';

const { Search } = Input;
const columns = [
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
    title: '是否出库',
    dataIndex: 'isStorage',
    key: 'isStorage',
    width: '10%',
    render: text => (text ? '否' : '是'),
  },
];

function Stock(props) {
  const { route } = props;

  const [model, setModel] = useState({ visible: false, modalParams: {} });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
  });

  useEffect(() => {
    queryData();
  }, [pages.pageNo, pages.pageSize, search]);

  async function queryData() {
    setLoading(true);
    const params = { pageNo: pages.pageNo, pageSize: pages.pageSize, search };
    const result = await request.get('/api/product/list', { params });
    const { data, count } = result.data;

    setPages(state => ({ ...state, count, data }));
    setLoading(false);
  }

  // 删除
  const deleteProduct = async record => {
    await request.delete(`/api/product/${record._id}`);
    message.success(`成功删除${record.productName}`);
    queryData();
  };

  // 编辑浮层
  const showModal = record => setModel({ modalParams: record, visible: true });

  // 关闭浮层
  const handleCancel = useCallback(() => {
    setModel(state => ({ ...state, visible: false }));
  }, []);

  // 编辑保存
  const handleOk = useCallback(async params => {
    setLoading(true);

    await request.post('/api/product/save', params);
    setLoading(false);
    message.success('更新产品成功');

    handleCancel();
    queryData();
  }, []);

  const newColumns = columns.concat({
    title: '操作',
    width: '15%',
    render: (text, record) => (
      <Fragment>
        <Button
          type="primary"
          size="small"
          style={{ margin: '0 8px' }}
          onClick={() => showModal(record)}
        >
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
    <div>
      <PageHeader title={route.name} />
      <Search
        placeholder="搜索"
        onSearch={val => setSearch(val)}
        style={{ width: 200, marginBottom: '16px' }}
      />
      <Table
        columns={newColumns}
        dataSource={pages.data}
        rowKey="_id"
        pagination={pagination}
        loading={loading}
      />
      {model.visible && (
        <StockModal {...model} loading={loading} saveModal={handleOk} handleCancel={handleCancel} />
      )}
    </div>
  );
}

Stock.propTypes = {
  route: PropTypes.object,
};

export default Stock;
