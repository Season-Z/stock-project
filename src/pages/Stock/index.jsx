import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, message, Modal, Select } from 'antd';
import PageHeader from '@/components/PageHeader';
import StockModal from './StockModal';
import AccessModal from './AccessModal';
import DropdownMenu from '@/components/DropdownMenu';
import request from '@/utils/request';
import { columns } from './columns';
import { getUserInfo } from '@/utils/config';

const { Search } = Input;

function Stock(props) {
  const { route } = props;

  const roleRef = useRef(getUserInfo());
  const [model, setModel] = useState({ visible: false, modalParams: {} });
  const [accessModel, setAccessModel] = useState({ visible: false, modalParams: {} });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({
    value: undefined,
    list: [],
  });
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
  });

  useEffect(() => {
    queryData();
    /*eslint react-hooks/exhaustive-deps: "off"*/
  }, [pages.pageNo, pages.pageSize, search, users.value]);

  useEffect(() => {
    request.get('/api/user/list').then(val => {
      setUsers(state => ({ ...state, list: val.data }));
    });
  }, []);

  async function queryData() {
    setLoading(true);
    const params = {
      pageNo: pages.pageNo,
      pageSize: pages.pageSize,
      search,
      username: users.value,
    };
    const result = await request.get('/api/product/list', { params });
    const { data, count } = result.data;

    setPages(state => ({ ...state, count, data }));
    setLoading(false);
  }

  // 删除
  const deleteProduct = record => {
    const sendRequest = async () => {
      await request.delete(`/api/product/${record._id}`);
      message.success(`成功删除${record.productName}`);
      queryData();
    };

    Modal.confirm({
      title: '确认删除该产品吗？',
      okType: 'danger',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        sendRequest && sendRequest();
      },
    });
  };

  // 关闭浮层
  const handleCancel = useCallback(() => {
    setModel(state => ({ ...state, visible: false }));
  }, []);
  const handleAccessCancel = useCallback(() => {
    setAccessModel(state => ({ ...state, visible: false }));
  }, []);

  // 编辑保存
  const handleOk = useCallback(async params => {
    setLoading(true);

    await request.post('/api/product/save', params);
    setLoading(false);
    message.success('操作成功');

    handleCancel();
    handleAccessCancel();
    queryData();
  }, []);

  const newColumns = columns.concat({
    title: '操作',
    width: '20%',
    render: (_, record) => {
      const { role } = roleRef.current;
      const dataList = [
        {
          event: () => setModel({ modalParams: record, visible: true }),
          name: '编辑',
          role: 1,
        },
        {
          event: () =>
            setAccessModel({ modalParams: { ...record, type: 'storage' }, visible: true }),
          name: '入库',
          role: 2,
        },
        {
          event: () =>
            setAccessModel({ modalParams: { ...record, type: 'delivery' }, visible: true }),
          name: '出库',
          role: 3,
        },
        {
          event: () => deleteProduct(record),
          name: '删除',
          role: 1,
        },
      ].filter(v => v.role === role);

      return <DropdownMenu dataList={dataList} num={2} />;
    },
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
      <Select
        placeholder="创建人"
        style={{ width: '200px' }}
        onChange={val => setUsers(state => ({ ...state, value: val }))}
      >
        <Select.Option value="">全部</Select.Option>
        {users.list.map(v => (
          <Select.Option key={v.username} value={v.username}>
            {v.username}
          </Select.Option>
        ))}
      </Select>
      <Table
        columns={newColumns}
        dataSource={pages.data}
        rowKey="_id"
        pagination={pagination}
        loading={loading}
        scroll={{ x: 1230 }}
      />
      {model.visible && (
        <StockModal {...model} loading={loading} saveModal={handleOk} handleCancel={handleCancel} />
      )}
      {accessModel.visible && (
        <AccessModal
          {...accessModel}
          loading={loading}
          saveModal={handleOk}
          handleCancel={handleAccessCancel}
        />
      )}
    </div>
  );
}

Stock.propTypes = {
  route: PropTypes.object,
};

export default Stock;
