import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {
  BUSI_APP_DEL_TEMPLATE, COMMON_ADD,
  COMMON_UPDATE,
  MINI_APP_PAGE,
  MINI_APP_TEMPLATES,
  MINI_APP_UPLOAD
} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Divider, Input, Select} from "antd";
import Text from "antd/es/typography/Text";
import React, {useRef, useState} from "react";
import {useQuery} from "react-query";

export default function () {

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()

  const columns = [
    {
      title: 'id',
      dataIndex: 'templateId',
      hideInSearch: true,
    },
    {
      title: '版本',
      dataIndex: 'userVersion',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'userDesc',
      hideInSearch: true,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'templateId',
      hideInForm: true,
      hideInSearch: true,
      render: (templateId, row) => (
        <>
          <a onClick={() => {
            setRaw(raw)
            formRef.current.toggle()
          }}>设为体验版</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            Request(BUSI_APP_DEL_TEMPLATE, {templateId})
            actionRef.current.reload()
          }}>删除</a>
        </>
      ),
    },
  ]

  async function handleSubmit(values) {
    await Request(MINI_APP_UPLOAD, values)
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='列表' url={MINI_APP_TEMPLATES} columns={columns}>
    <SuperForm ref={formRef} title='选择小程序' value={raw} columns={[{
      title: '小程序',
      dataIndex: 'appId',
      renderFormItem: () => <MiniList/>
    },
      {
        title: '模板',
        dataIndex: 'templateId',
      }]} onSubmit={handleSubmit}/>
  </TablePro>
}

function MiniList({value, onChange}) {
  const {data} = useQuery(MINI_APP_PAGE, () => Request(MINI_APP_PAGE).then(r => r.list.map(l => ({
    value: l.appId,
    label: l.nickName,
  }))))

  return <Select options={data} label="小程序" onChange={(e) => {
    onChange(e);
  }}/>
}
