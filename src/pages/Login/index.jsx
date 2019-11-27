import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Form, Icon, Input, Button, message } from 'antd';

import styles from './index.less';
import bgHomeImage from '@/assets/bg_home.jpg';

const FormItem = Form.Item;
const { Header, Content } = Layout;

function Login(props) {
  const { getFieldDecorator } = props.form;

  const handleSubmit = async () => {
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const { code, msg } = await props.loginStore.login(values);

      if (code === '1000000') {
        message.success(msg);
        window.location.replace('/');
      }
    });
  };

  return (
    <Layout style={{ height: '100%' }} className={styles.loginPage}>
      <Header>
        <div className={styles.logo} />
      </Header>
      <Content className={styles.loginContent}>
        <img src={bgHomeImage} alt="bg_img" className={styles.contentImg} />
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.title}>登录</div>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(
              <Input
                className={styles.input}
                addonBefore={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="账号"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入登录密码',
                },
              ],
            })(
              <Input
                className={styles.input}
                addonBefore={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="登录密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              登录
            </Button>
          </FormItem>
        </Form>
      </Content>
    </Layout>
  );
}

Login.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(Login);
