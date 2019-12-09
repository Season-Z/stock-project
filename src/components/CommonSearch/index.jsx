import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker } from 'antd';
import moment from 'moment';
import request from '@/utils/request';
import styles from './index.less';

const { RangePicker } = DatePicker;

function CommonSearch(props) {
  const { render, userCallback, dateCallback } = props;
  const [users, setUsers] = useState({ value: '', list: [] });
  const [date, setDate] = useState(undefined);

  const changeUser = value => {
    setUsers(state => ({ ...state, value }));
    userCallback && userCallback(value);
  };

  const changeDate = value => {
    setDate(value);

    if (dateCallback) {
      const [start, end] = value;
      const startTime = start ? moment(start).format('YYYY-MM-DD HH:mm:ss') : '';
      const endTime = end ? moment(end).format('YYYY-MM-DD HH:mm:ss') : '';
      dateCallback({ startTime, endTime });
    }
  };

  useEffect(() => {
    request.get('/api/user/list').then(val => {
      setUsers(state => ({ ...state, list: val.data }));
    });
  }, []);

  return (
    <div className={styles.commonSearch}>
      {render && render()}
      <div className={styles.item}>
        <label>人员：</label>
        <Select
          placeholder="创建人"
          style={{ width: '200px' }}
          value={users.value}
          onChange={changeUser}
        >
          <Select.Option value="">全部</Select.Option>
          {users.list.map(v => (
            <Select.Option key={v.username} value={v.username}>
              {v.username}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={styles.item}>
        <label>日期：</label>
        <RangePicker
          showTime
          placeholder={['开始时间', '结束时间']}
          value={date}
          onChange={changeDate}
        />
      </div>
    </div>
  );
}

CommonSearch.propTypes = {
  dateCallback: PropTypes.func,
  userCallback: PropTypes.func,
};

export default CommonSearch;
