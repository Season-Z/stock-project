import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Menu, Divider } from 'antd';

const MenuItem = Menu.Item;

/**
 * 渲染含下拉功能的操作按钮
 * @param {array} list
 * @param {number} num  展示在外面的数量
 */
function renderDrop(list, num) {
  // const [firObj, secObj, ...resetList] = list;
  const outsideArr = list.slice(0, num);
  const resetList = list.slice(num);
  // 取出前两项
  const commonMenu = renderMenu(outsideArr);

  const dropMenu = (
    <Dropdown overlay={renderDropMenu(resetList)}>
      <a>
        更多操作
        <Icon type="down" />
      </a>
    </Dropdown>
  );

  return (
    <React.Fragment>
      {commonMenu}
      <Divider type="vertical" />
      {dropMenu}
    </React.Fragment>
  );
}

/**
 * 下拉 菜单
 * @param {array} list
 */
function renderDropMenu(list) {
  return <Menu>{renderMenu(list, MenuItem, null)}</Menu>;
}

/**
 * 渲染不含下拉功能的操作按钮
 * @param {array} list
 */
function renderMenu(list, Element = React.Fragment, hasDiver) {
  const div = hasDiver === null ? '' : <Divider type="vertical" />;
  const length = list.length;

  return (
    list &&
    list.map((value, index) => {
      // 判断当前是否为最后一项
      const isLast = index + 1 === length;

      return (
        <Element key={value.name}>
          <a onClick={value.event}>{value.name}</a>
          {!isLast && div}
        </Element>
      );
    })
  );
}

function DropdownMenu(props) {
  const { dataList, num } = props;
  const dataLen = dataList.length;

  const count = num + 1;

  return <div>{dataLen > count ? renderDrop(dataList, num) : renderMenu(dataList)}</div>;
}

DropdownMenu.propTypes = {
  dataList: PropTypes.array.isRequired,
  num: PropTypes.number,
};
DropdownMenu.defaultProps = {
  num: 2,
};

export default DropdownMenu;
