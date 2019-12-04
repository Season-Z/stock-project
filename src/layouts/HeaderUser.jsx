import React, { useEffect, useState, useContext } from 'react';
import { Dropdown, Menu, Avatar, Icon } from 'antd';
import request from '@/utils/request';
import storage from '@/utils/storage';
import { layoutContext } from './context';

import styles from './index.less';

function HeaderUser() {
  const { history } = useContext(layoutContext);

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
