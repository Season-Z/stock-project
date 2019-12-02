import React, { memo, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import withRouter from 'umi/withRouter';
import routes from '../routers';
import { checkPromise } from '@/utils/config';

const { Item: MenuItem } = Menu;

const SiderMenu = memo(function SiderMenu(props) {
  const { pathname } = props.location;
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [openKeys, setOpenKeys] = useState([]);
  const subMenus = useMemo(() => routes.filter(v => v.routes).map(v => v.path), [routes]);
  const routesMenu = useMemo(() => routes.filter(v => checkPromise(v.path)), [routes]);

  useEffect(() => {
    const pathArr = pathname
      .split('/')
      .filter(Boolean)
      .map(v => `/${v}`);

    setOpenKeys(pathArr.slice(0));
    setSelectedKeys([pathname]);
  }, [pathname]);

  const handleChangeMenu = ({ key }) => {
    props.history.push(key);
  };

  const onOpenChange = key => {
    const latestOpenKey = key.find(k => openKeys.indexOf(k) === -1);
    if (subMenus.indexOf(latestOpenKey) === -1) {
      setOpenKeys(key);
    } else {
      const list = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(list);
    }
  };

  return (
    <React.Fragment>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={handleChangeMenu}
        onOpenChange={onOpenChange}
      >
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
