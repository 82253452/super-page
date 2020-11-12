import {UploadOutlined} from "@ant-design/icons";
import BraftEditor from "braft-editor";
import Upload from "@/components/Qiniu/upload";
import 'braft-editor/dist/index.css'
import {ContentUtils} from 'braft-utils'
import React, {useState} from "react";

const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']

export default function ({value, onChange}) {

  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(value))

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          max={10}
          showUploadList={false}
          onChange={uploadHandler}
          listType=''
        >
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            <UploadOutlined/>
          </button>
        </Upload>
      )
    }
  ]

  function handleChangle(state) {
    setEditorState(state)
    onChange && onChange(state.toHTML())
  }

  function uploadHandler(url) {
    setEditorState(ContentUtils.insertMedias(editorState, [{
      type: 'IMAGE',
      url: url
    }]))
  }


  return <div>
    <div className="editor-wrapper">
      <BraftEditor
        value={editorState}
        onChange={handleChangle}
        controls={controls}
        extendControls={extendControls}
      />
    </div>
  </div>
}
