import React from 'react';
import { Layout, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import HeaderSelect from './HeaderSelect';
import HeaderUser from './HeaderUser';
import styles from './index.less';

const { Header } = Layout;

function HeaderBar(props) {
  const { collapsed, toggleCollapsed } = props;

  return (
    <Header className={styles.headerBar}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapsed}
      />
      <div>
        <HeaderSelect />
        <Button type="primary" ghost icon="plus" className={styles.addBtn}>
          新建
        </Button>
        <HeaderUser />
      </div>
    </Header>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
