import React, { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, message, Modal, Button } from 'antd';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import StockModal from './StockModal';
import AccessModal from './AccessModal';
import DropdownMenu from '@/components/DropdownMenu';
import CommonSearch from '@/components/CommonSearch';
import Export from '@/utils/export';
import request from '@/utils/request';
import { columns } from './columns';
import { getUserInfo } from '@/utils/config';

const { Search } = Input;

function Stock(props) {
  const { route } = props;

  const roleRef = useRef(getUserInfo());
  const [model, setModel] = useState({ visible: false, modalParams: {} });
  const [accessModel, setAccessModel] = useState({ visible: false, modalParams: {} });
  const [otherSearch, setOtherSearch] = useState({
    username: undefined,
    startTime: undefined,
    endTime: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
    search: '',
  });

  useEffect(() => {
    queryData();
    /* eslint react-hooks/exhaustive-deps: "off" */
  }, [pages.pageNo, pages.pageSize, pages.search]);

  async function queryData(values = {}) {
    try {
      setLoading(true);
      const params = {
        ...values,
        pageNo: pages.pageNo,
        pageSize: pages.pageSize,
        search: pages.search,
      };

      const result = await request.get('/api/product/list', { params });
      const { data, count } = result.data;

      setPages(state => ({ ...state, count, data }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  // 删除
  const deleteProduct = record => {
    const sendRequest = async () => {
      await request.delete(`/api/product/${record._id}`);
      message.success(`成功删除${record.productName}`);

      if (pages.data.length === 1 && pages.pageNo !== 1) {
        setPages(state => ({ ...state, pageNo: 1 }));
      } else {
        queryData();
      }
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
  const handleOk = useCallback(
    async params => {
      try {
        setLoading(true);
        await request.post('/api/product/save', params);
        setLoading(false);
        message.success('操作成功');

        queryData();
        handleCancel();
        handleAccessCancel();
      } catch (error) {
        setLoading(false);
      }
    },
    [pages],
  );

  const userCallback = useCallback(value => {
    queryData({ username: value });
    setOtherSearch(state => ({ ...state, username: value }));
  }, []);
  const dateCallback = useCallback(value => {
    queryData(value);
    setOtherSearch(state => ({ ...state, ...value }));
  }, []);

  const exportProduct = async () => {
    try {
      setLoading(true);
      const params = {
        pageNo: 1,
        search: pages.search,
        isExport: true,
        ...otherSearch,
      };
      const result = await request.get('/api/product/list', { params });
      const data = result.data.data || [];
      const exportData = data.map(v => ({
        产品名称: v.productName,
        产品类别: v.productType,
        产品描述: v.productMemo,
        库存数量: v.productCount,
        创建人: v.username,
        创建时间: moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        修改时间: moment(v.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      }));

      const ExportExcel = new Export({ data: exportData, filename: '产品数据' });
      ExportExcel.handleExport();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const newColumns = columns.concat({
    title: '操作',
    width: '15%',
    render: (_, record) => {
      const { role } = roleRef.current;
      const dataList = [
        {
          event: () =>
            setAccessModel({ modalParams: { ...record, type: 'storage' }, visible: true }),
          name: '入库',
          role: [2],
        },
        {
          event: () =>
            setAccessModel({ modalParams: { ...record, type: 'delivery' }, visible: true }),
          name: '出库',
          role: [3],
        },
        {
          event: () => setModel({ modalParams: record, visible: true }),
          name: '编辑',
          role: [1, 2],
        },
        {
          event: () => deleteProduct(record),
          name: '删除',
          role: [1],
        },
      ].filter(v => v.role.includes(role));

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
      <PageHeader title={route.name} />
      <CommonSearch
        userCallback={userCallback}
        dateCallback={dateCallback}
        render={() => (
          <Search
            placeholder="搜索名称"
            onSearch={val => setPages(state => ({ ...state, search: val }))}
            style={{ width: 200, marginBottom: '16px' }}
          />
        )}
        renderBtn={() => (
          <Button type="primary" onClick={exportProduct}>
            导出
          </Button>
        )}
      />
      <Table
        columns={newColumns}
        dataSource={pages.data}
        rowKey="_id"
        pagination={pagination}
        loading={loading}
        scroll={{ x: 1350 }}
      />
      {model.visible && (
        <StockModal
          {...model}
          role={roleRef.current.role}
          loading={loading}
          saveModal={handleOk}
          handleCancel={handleCancel}
        />
      )}
      {accessModel.visible && (
        <AccessModal
          {...accessModel}
          loading={loading}
          saveModal={handleOk}
          handleCancel={handleAccessCancel}
        />
      )}
    </Fragment>
  );
}

Stock.propTypes = {
  route: PropTypes.object,
};

export default Stock;
