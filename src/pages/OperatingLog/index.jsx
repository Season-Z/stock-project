import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Timeline, Pagination, Empty, Spin } from 'antd';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import request from '@/utils/request';

import styles from './index.less';

function OperatingLog(props) {
  const { route } = props;

  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
    loading: false,
  });

  useEffect(() => {
    setPages(state => ({ ...state, loading: true }));
    const params = { pageNo: pages.pageNo, pageSize: pages.pageSize };

    request
      .get('/api/log/list', { params })
      .then(val => {
        const { data, count } = val.data;

        setPages(state => ({ ...state, count, data, loading: false }));
      })
      .catch(() => {
        setPages(state => ({ ...state, loading: false }));
      });
  }, [pages.pageNo, pages.pageSize]);

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
    <Spin spinning={pages.loading}>
      <PageHeader title={route.name} />
      <Timeline className={styles.timeline}>
        {pages.data.map(val => (
          <Timeline.Item color={val.isStorage ? 'red' : 'green'} key={val._id}>
            <span className={styles.timelineDate}>
              {moment(val.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span className={styles.username}>{val.username}</span>
            <span className={styles.strong}>{val.isStorage ? '入' : '出'}</span>库了
            <span className={styles.strong}>{val.count}</span>件 「
            <span className={styles.productName}>{val.products && val.products.productName}</span>」
            ，目前产品总数为
            <span className={styles.strong}>{val.products && val.products.productCount}</span>件
          </Timeline.Item>
        ))}
      </Timeline>
      {pages.data.length === 0 ? <Empty description="暂无数据" /> : <Pagination {...pagination} />}
    </Spin>
  );
}

OperatingLog.propTypes = {
  route: PropTypes.object,
};

export default OperatingLog;
