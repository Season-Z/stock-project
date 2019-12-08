import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker } from 'antd';
import request from '@/utils/request';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function CommonSearch(props) {
  const [users, setUsers] = useState({
    value: undefined,
    list: [],
  });

  useEffect(() => {
    request.get('/api/user/list').then(val => {
      setUsers(state => ({ ...state, list: val.data }));
    });
  }, []);

  return (
    <div>
      <div>
        <label>用户：</label>
        <Select
          placeholder="创建人"
          style={{ width: '200px' }}
          value={users.value}
          onChange={val => setUsers(state => ({ ...state, value: val }))}
        >
          <Select.Option value="">全部</Select.Option>
          {users.list.map(v => (
            <Select.Option key={v.username} value={v.username}>
              {v.username}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <label>日期：</label>
        <RangePicker />
      </div>
    </div>
  );
}

CommonSearch.propTypes = {};

export default CommonSearch;
