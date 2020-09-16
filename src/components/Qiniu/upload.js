import {COMMON_TOKEN} from "@/services/apis";
import {Request} from "@/utils/utils";
import PlusOutlined from "@ant-design/icons";
import {Modal, Upload} from 'antd';
import React, {useEffect, useState} from 'react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const baseUrl = 'http://images.y456.cn/';

export default function ({single, value, onChange}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [img, setImg] = useState('');
  const [fileLists, setFileLists] = useState([]);
  const [uploaData, setUploaData] = useState({});
  const [headers, setHeaders] = useState({});
  useEffect(() => {
    single
      ? setImg(value)
      : setFileLists(value ? value.split(',').map((url, uid) => ({url, uid})) : []);
  }, [value]);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = ({file, fileList}) => {
    file.response && console.log(`${baseUrl}${file.response.key}`)
    if (single) {
      file.response && onChange && onChange(`${baseUrl}${file.response.key}`);
      file.response && setImg(`${baseUrl}${file.response.key}`);
    } else {
      file.response &&
      onChange &&
      onChange(`${value ? `${value},` : ''}${baseUrl}${file.response.key}`);
    }
    setFileLists([...fileList]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  async function beforeUpload(file) {
    await Request(COMMON_TOKEN)
      .then(data => {
        setUploaData({token: data.uptoken});
        setHeaders({Authorization: `UpToken ${data.uptoken}`});
      });
  }

  return (
    <div className="clearfix">
      <Upload
        showUploadList={!single}
        headers={headers}
        action="//up-z1.qiniup.com/"
        listType="picture-card"
        fileList={fileLists}
        data={uploaData}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {!!img && <img src={img} alt="avatar" style={{width: '100%'}}/>}
        {!img && uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>
    </div>
  );
}
