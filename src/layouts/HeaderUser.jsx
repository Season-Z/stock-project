import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Avatar, Icon } from 'antd';
import styles from './index.less';

const getDropMenu = () => (
  <Menu>
    <Menu.Item>
      <span style={{ display: 'block' }}>
        <Icon type="setting" /> 修改密码
      </span>
    </Menu.Item>
    <Menu.Item>
      <span style={{ display: 'block' }}>
        <Icon type="pushpin" /> 偏好设置
      </span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <span style={{ display: 'block' }}>
        <Icon type="logout" /> 退出登录
      </span>
    </Menu.Item>
  </Menu>
);

function HeaderUser(props) {
  return (
    <span className={styles.userCenter}>
      <Dropdown overlay={getDropMenu}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Dropdown>
      <span className="username">user</span>
    </span>
  );
}

HeaderUser.propTypes = {};

export default HeaderUser;
