import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Avatar, Icon } from 'antd';
import request from '@/utils/request';
import storage from '@/utils/storage';
import styles from './index.less';

function HeaderUser() {
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
    window.location.href = '/login';
  };

  const getDropMenu = () => (
    <Menu>
      <Menu.Item>
        <span style={{ display: 'block' }}>
          <Icon type="setting" /> 修改密码
        </span>
      </Menu.Item>
      <Menu.Divider />
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
