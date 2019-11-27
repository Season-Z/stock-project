/**
 * 小标题
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import styles from './index.less';

const Subheading = memo(function Subheading(props) {
  return (
    <div className={styles.subheading}>
      <Divider type="vertical" className={styles.descDivider} />
      {props.title}
    </div>
  );
});

Subheading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subheading;
