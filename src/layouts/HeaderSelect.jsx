import React from 'react';
// import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

function HeaderSelect() {
  return (
    <Select style={{ width: 180 }}>
      <Option value="lucy">Lucy</Option>
    </Select>
  );
}

// HeaderSelect.propTypes = {};

export default HeaderSelect;
