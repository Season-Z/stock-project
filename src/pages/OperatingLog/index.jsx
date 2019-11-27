import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Timeline } from 'antd';
import PageHeader from '@/components/PageHeader';

function OperatingLog(props) {
  const { route } = props;

  return (
    <Fragment>
      <PageHeader title={route.name} />
      <Timeline>
        <Timeline.Item>xxx出库了x件xx产品 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    </Fragment>
  );
}

OperatingLog.propTypes = {
  route: PropTypes.object,
};

export default OperatingLog;
