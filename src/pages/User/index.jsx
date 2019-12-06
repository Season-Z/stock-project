import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, message, Button, Modal } from 'antd';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import DropdownMenu from '@/components/DropdownMenu';
import UserModal from './UserModal';
import request from '@/utils/request';

// eslint-disable-next-line
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (t, r, i) => i + 1,
  },
  {
    title: '用户名称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '用户类型',
    dataIndex: 'role',
    key: 'role',
    render: text => {
      const type = {
        1: '管理员',
        2: '入库人员',
        3: '出库人员',
      };
      return text && type[text];
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''),
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''),
  },
];

function User(props) {
  const [model, setModel] = useState({ visible: false, modalParams: {} });
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

  async function queryData() {
    try {
      setPages(state => ({ ...state, loading: true }));
      const params = { pageNo: pages.pageNo, pageSize: pages.pageSize };
      const result = await request.get('/api/user/list', { params });
      const { data, count } = result.data;

      setPages(state => ({ ...state, count, data, loading: false }));
    } catch (error) {
      setPages(state => ({ ...state, loading: false }));
    }
  }

  // 关闭浮层
  const handleCancel = useCallback(() => {
    setModel(state => ({ ...state, visible: false }));
  }, []);

  const handleOk = useCallback(async params => {
    try {
      setPages(state => ({ ...state, loading: true }));

      await request.post('/api/user/save', params);
      message.success('操作成功');

      handleCancel();
      queryData();
    } catch (error) {
      setPages(state => ({ ...state, loading: false }));
    }
  }, []);

  // 删除
  const deleteUser = record => {
    const sendRequest = async () => {
      await request.delete(`/api/user/${record._id}`);
      message.success(`成功删除${record.username}`);

      if (pages.data.length === 1) {
        setPages(state => ({ ...state, pageNo: 1 }));
      } else {
        queryData();
      }
    };

    Modal.confirm({
      title: '确认删除该人员吗？',
      okType: 'danger',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        sendRequest && sendRequest();
      },
    });
  };

  const newColumns = columns.concat({
    title: '操作',
    width: '20%',
    render: (_, record) => {
      const dataList = [
        {
          event: () => setModel({ visible: true, modalParams: record }),
          name: '修改密码',
        },
        {
          event: () => deleteUser(record),
          name: '删除',
        },
      ];

      return <DropdownMenu dataList={dataList} num={2} />;
    },
  });

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
      <PageHeader title={props.route.name} />
      <Button
        type="primary"
        style={{ marginBottom: '16px' }}
        onClick={() => setModel({ visible: true, modalParams: {} })}
      >
        添加人员
      </Button>
      <Table
        columns={newColumns}
        dataSource={pages.data}
        rowKey="_id"
        pagination={pagination}
        loading={pages.loading}
      />
      {model.visible && <UserModal {...model} saveModal={handleOk} handleCancel={handleCancel} />}
    </Fragment>
  );
}

User.propTypes = {
  route: PropTypes.object,
};

export default User;
