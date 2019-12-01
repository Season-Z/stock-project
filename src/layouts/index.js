import React, { useState, useCallback } from 'react';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu';
import HeaderBar from './HeaderBar';
import { LayoutWrapper } from './context';

import styles from './index.less';

const { Sider, Content } = Layout;

export default function BasicLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), []);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>{collapsed ? '' : '库存管理'}</div>
        <SiderMenu />
      </Sider>
      <Layout>
        <LayoutWrapper value={{ ...props, collapsed, toggleCollapsed }}>
          <HeaderBar />
        </LayoutWrapper>
        <Content className={styles.pageContent}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
