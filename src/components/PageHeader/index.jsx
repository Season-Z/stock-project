import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import styles from './index.less';

function PageHeader(props) {
  const { title, description } = props;
  return (
    <div className={styles.pageName}>
      {title}
      <span className={styles.pageNameDesc}>{description}</span>
      <Divider />
    </div>
  );
}

PageHeader.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default PageHeader;
