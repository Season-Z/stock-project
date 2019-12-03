import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Tabs, message } from 'antd';
import request from '@/utils/request';
import storage from '@/utils/storage';
import LoginForm from './LoginForm';

import styles from './index.less';
import bgHomeImage from '@/assets/bg_home.jpg';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function Login(props) {
  const { history } = props;
  const [activeKey, setActiveKey] = useState('login');

  const changeTabs = key => setActiveKey(key);

  const handleSubmit = async values => {
    if (activeKey === 'login') {
      const result = await request.post('/api/user/login', values);
      storage.setItem('token', result.token);
      message.success('登录成功');
      setTimeout(() => history.replace('/'), 500);
    } else {
      await request.post('/api/user/register', values);

      message.success(`添加新用户【${values.username}】成功`);
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <Layout style={{ height: '100%' }} className={styles.loginPage}>
      <Header>
        <div className={styles.logo} />
      </Header>
      <Content className={styles.loginContent}>
        <img src={bgHomeImage} alt="bg_img" className={styles.contentImg} />
        <Tabs activeKey={activeKey} onChange={changeTabs} className={styles.loginForm}>
          <TabPane tab="登录" key="login">
            <LoginForm handleSubmit={handleSubmit} type="login" btnName="登录" />
          </TabPane>
          <TabPane tab="注册" key="register">
            <LoginForm handleSubmit={handleSubmit} type="register" btnName="注册" />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}

Login.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
};

export default Login;
