import React from 'react';
import { Upload, Icon, message, notification } from 'antd';
import PropTypes from 'prop-types';
import storage from '@/utils/storage';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('图片必须小于 1MB!');
  }
  return isJpgOrPng && isLt2M;
}

class UploadImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: props.imageUrl || '',
      loading: false,
    };
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      this.setState({ loading: false });
      const { success, message, data: imgData } = info.file.response;
      if (!success) {
        notification.error({
          message: '请求错误',
          description: message,
        });
        return;
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        console.log(imgData);

        this.props.setImgUrl({ imageId: imgData.imgId, imageUrl });

        this.setState({
          imageUrl,
        });
      });
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    const { imageUrl } = this.state;
    const authorization = storage.getItem('token');

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`/api/product/upload`}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={{ authorization }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

UploadImg.propTypes = {
  setImgUrl: PropTypes.func,
};
export default UploadImg;
