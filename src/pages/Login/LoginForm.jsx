import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import request from '@/utils/request';
import storage from '@/utils/storage';

import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

function LoginForm(props) {
  const { btnName } = props;
  const { getFieldDecorator } = props.form;

  const saveForm = async e => {
    e.preventDefault();

    const values = props.form.getFieldsValue();

    const result = await request.post('/api/user/login', values);
    storage.setItem('token', result.token);
    message.success('登录成功');
    window.location.replace('/stock');
  };

  return (
    <Form {...formItemLayout} onSubmit={saveForm}>
      <FormItem label="账号">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: '请输入账号',
            },
          ],
        })(<Input className={styles.input} placeholder="账号" />)}
      </FormItem>
      <FormItem label="密码">
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入登录密码',
            },
          ],
        })(<Input className={styles.input} type="password" placeholder="登录密码" />)}
      </FormItem>

      <FormItem wrapperCol={{ xs: { span: 24 }, sm: { span: 24 } }}>
        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
          {btnName}
        </Button>
      </FormItem>
    </Form>
  );
}

LoginForm.propTypes = {
  btnName: PropTypes.string,
  form: PropTypes.object,
};

export default Form.create()(LoginForm);
