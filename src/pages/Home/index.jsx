import React, { Component, Fragment } from 'react';
import { List } from 'antd';
import Header from './Header';
import DetailModal from './DetailModal';
import request from '@/utils/request';
import { Nav00DataSource } from './dataSource';

export default class Home extends Component {
  state = {
    listData: [],
    pageNo: 1,
    pageSize: 5,
    visible: false,
    modalParams: {},
  };

  componentDidMount() {
    this.getImgList();
  }

  getImgList = async (values = {}) => {
    try {
      const params = {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize,
        ...values,
      };
      const { data } = await request.get('/api/viewPro/list', { params });

      this.setState({
        listData: data.data,
        listCount: data.count,
        pageNo: data.pageNo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  showProductDetail = params => {
    this.setState({
      modalParams: params,
      visible: true,
    });
  };

  handleCancel = () => this.setState({ visible: false, modalParams: {} });

  render() {
    const { pageNo, listData, listCount, pageSize, visible, modalParams } = this.state;
    return (
      <Fragment>
        <Header id="Nav0_0" key="Nav0_0" dataSource={Nav00DataSource} />
        <div style={{ width: '900px', margin: '0 auto', paddingBottom: '20px' }}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={
              listCount
                ? {
                    onChange: page => this.getImgList({ pageNo: page }),
                    current: pageNo,
                    total: listCount,
                    pageSize,
                  }
                : null
            }
            dataSource={listData}
            footer={
              listCount ? (
                <div>
                  <b>数据总量：</b> {listCount}
                </div>
              ) : null
            }
            renderItem={item => (
              <List.Item
                key={item.title}
                extra={
                  <a onClick={() => this.showProductDetail(item)}>
                    <img
                      style={{ maxWidth: '320px', maxHeight: '220px' }}
                      alt="logo"
                      src={item.imageUrl ? item.imageUrl : null}
                    />
                  </a>
                }
              >
                <div onClick={() => this.showProductDetail(item)} style={{ cursor: 'pointer' }}>
                  <List.Item.Meta title={item.productName} description={item.productType} />
                  {item.productMemo}
                </div>
              </List.Item>
            )}
          />
        </div>
        <DetailModal visible={visible} handleCancel={this.handleCancel} modalParams={modalParams} />
      </Fragment>
    );
  }
}
