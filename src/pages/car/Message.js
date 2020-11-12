import DelConfirm from '@/components/DelConfirm'
import SuperForm from "@/components/SuperForm";
import Editor from "@/components/Editor";
import TablePro from "@/components/TablePro/TablePro";
import {MESSAGE_ADD, MESSAGE_DEL, MESSAGE_PAGE, MESSAGE_UPDATE} from "@/services/apis";
import {Gen} from "@/utils/IdToCode";
import {Request} from "@/utils/utils";
import {Button, Divider} from "antd";
import React, {useRef, useState} from "react";

export default function () {

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      formItemProps: {hidden: true}
    },
    {
      title: '标题',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填字段',
          },
        ],
      },
    },
    {
      title: '副标题',
      dataIndex: 'subheading',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填字段',
          },
        ],
      },
    },
    {
      title: '内容',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'content',
      renderFormItem: ()=><Editor/>,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, raw) => (
        <>
          <a onClick={() => {
            setRaw(raw)
            formRef.current.toggle()
          }}>更新</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]

  async function del(id) {
    await Request(MESSAGE_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(MESSAGE_UPDATE, values)
    } else {
      await Request(MESSAGE_ADD, values)
    }
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='列表' url={MESSAGE_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => {
      setRaw({})
      formRef.current.toggle()
    }}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}
