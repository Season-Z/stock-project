import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio } from 'antd';

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
  const { handleSubmit, btnName, type } = props;
  const { getFieldDecorator, validateFields } = props.form;

  const saveForm = () => {
    validateFields(async (err, values) => {
      if (err) {
        return;
      }

      handleSubmit(values);
    });
  };

  return (
    <Form {...formItemLayout}>
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
      {type === 'register' && (
        <FormItem label="类型">
          {getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: '请选择登录类型',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>管理员</Radio>
              <Radio value={2}>入库人员</Radio>
              <Radio value={3}>出库人员</Radio>
            </Radio.Group>,
          )}
        </FormItem>
      )}

      <FormItem wrapperCol={{ xs: { span: 24 }, sm: { span: 24 } }}>
        <Button type="primary" onClick={saveForm} className={styles.loginFormButton}>
          {btnName}
        </Button>
      </FormItem>
    </Form>
  );
}

LoginForm.propTypes = {
  btnName: PropTypes.string,
  form: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default Form.create()(LoginForm);
