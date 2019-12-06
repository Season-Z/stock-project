import React, { useContext } from 'react';
import { Dropdown, Menu, Avatar, Icon } from 'antd';
import { layoutContext } from './context';

import styles from './index.less';

function HeaderUser() {
  const { userInfo, logout } = useContext(layoutContext);

  const getDropMenu = () => (
    <Menu>
      <Menu.Item>
        <span style={{ display: 'block' }} onClick={logout}>
          <Icon type="logout" /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <span className={styles.userCenter}>
      <Dropdown overlay={getDropMenu}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Dropdown>
      <span className="username">{userInfo.username}</span>
    </span>
  );
}

export default HeaderUser;
