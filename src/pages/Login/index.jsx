import React from 'react';
import { Layout, Divider } from 'antd';
import LoginForm from './LoginForm';

import styles from './index.less';
import bgHomeImage from '@/assets/bg_home.jpg';

const { Header, Content } = Layout;

function Login() {
  return (
    <Layout style={{ height: '100%' }} className={styles.loginPage}>
      <Header>
        <div className={styles.logo} />
      </Header>
      <Content className={styles.loginContent}>
        <img src={bgHomeImage} alt="bg_img" className={styles.contentImg} />
        <div className={styles.loginForm}>
          <div className={styles.title}>登录</div>
          <Divider />
          <LoginForm type="login" btnName="登录" />
        </div>
      </Content>
    </Layout>
  );
}

export default Login;
