import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import storage from '@/utils/storage';

function UploadExcel(props) {
  const { action } = props;

  const uploadProps = {
    name: 'file',
    action,
    accept: '.xlsx,.xls',
    showUploadList: false,
    headers: {
      Authorization: storage.getItem('token'),
    },
    onChange(info) {
      const { status, name, response } = info.file;
      if (status === 'done') {
        if (response.code === 10000) {
          message.error(response.message);

          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          return;
        }

        if (!response.success) {
          message.error(response.message);
          return;
        }
        console.log(info.file, info.fileList);
        message.success(`${name} file uploaded successfully`);
      } else if (status === 'error') {
        message.error(response.message);
      }
    },
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    </div>
  );
}

export default UploadExcel;
