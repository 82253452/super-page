import {COMMON_TOKEN} from "@/services/apis";
import useModal from "@/utils/hooks/useModal";
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

const baseUrl = 'http://img.zhihuizhan.net';

export default function ({max = 1, value, onChange}) {
  const [previewImage, setPreviewImage] = useState('');
  const [fileLists, setFileLists] = useState(value ? value.split(',').map((url, uid) => ({
    url,
    uid,
    status: 'done',
    name: uid,
  })) : []);
  const [uploaData, setUploaData] = useState({});
  const [headers, setHeaders] = useState({});

  const [Modal, toggle] = useModal()

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    toggle();
  };
  const handleChange = ({file, fileList}) => {
    file.response && onChange && onChange(`${value ? `${value},` : ''}${baseUrl}/${file.response.key}`);
    setFileLists(fileList);
  };

  async function beforeUpload() {
    const token = await Request(COMMON_TOKEN)
    setUploaData({token});
    setHeaders({Authorization: `UpToken ${token}`});
  }


  return (
    <div className="clearfix">
      <Upload
        headers={headers}
        action="https://upload-z2.qiniup.com"
        listType="picture-card"
        fileList={fileLists}
        data={uploaData}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileLists.length < max && <div>
          <PlusOutlined/>
          <div style={{marginTop: 8}}>Upload</div>
        </div>}
      </Upload>
      <Modal>
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>
    </div>
  );
}
