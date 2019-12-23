import React, { Fragment } from 'react';
import PageHeader from '@/components/PageHeader';

export default function HomeEnd(props) {
  const { route } = props;
  return (
    <Fragment>
      <PageHeader title={route.name} />
    </Fragment>
  );
}
