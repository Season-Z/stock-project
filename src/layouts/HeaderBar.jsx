import React, { useContext } from 'react';
import { Layout, Icon } from 'antd';
import HeaderUser from './HeaderUser';
import { layoutContext } from './context';
import styles from './index.less';

const { Header } = Layout;

function HeaderBar() {
  const { collapsed, toggleCollapsed } = useContext(layoutContext);

  return (
    <Header className={styles.headerBar}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapsed}
      />
      <div>
        <HeaderUser />
      </div>
    </Header>
  );
}

export default HeaderBar;
