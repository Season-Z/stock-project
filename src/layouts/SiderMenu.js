import React, { memo, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import withRouter from 'umi/withRouter';
import routes from '../routers';
import { ROLE_MENU } from '@/utils/config';

const { Item: MenuItem } = Menu;

const SiderMenu = memo(props => {
  const { userInfo } = props;
  const { pathname } = props.location;
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const routesMenu = useMemo(() => routes.filter(v => {
      const roles = ROLE_MENU[v.path];
      if (!roles) {
        return false;
      }
      return roles.includes(userInfo.role);
    }), [routes, userInfo]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  const handleChangeMenu = ({ key }) => {
    props.history.push(key);
  };

  return (
    <React.Fragment>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={handleChangeMenu}>
        {routesMenu.map(value => (
          <MenuItem key={value.path}>
            {value.icon && <Icon type={value.icon} />}
            <span>{value.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
});

SiderMenu.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(SiderMenu);
