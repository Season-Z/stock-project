import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu';
import HeaderBar from './HeaderBar';
import { LayoutWrapper } from './context';
import request from '@/utils/request';
import storage from '@/utils/storage';

import styles from './index.less';

const { Sider, Content } = Layout;

export default function BasicLayout(props) {
  const { history } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    request.get('/api/user/info').then(val => {
      setUserInfo(val.data);
      storage.setItem('userInfo', val.data);
    });
  }, []);

  const logout = async () => {
    storage.removeItem('token');
    storage.removeItem('userInfo');
    history.replace('/login');
  };

  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), []);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>{collapsed ? '' : '库存管理'}</div>
        <SiderMenu userInfo={userInfo} />
      </Sider>
      <Layout>
        <LayoutWrapper value={{ ...props, collapsed, toggleCollapsed, userInfo, logout }}>
          <HeaderBar />
        </LayoutWrapper>
        <Content className={styles.pageContent}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
