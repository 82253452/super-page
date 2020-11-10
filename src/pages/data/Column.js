import DelConfirm from '@/components/DelConfirm'
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {COMMON_ADD, COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Button, Divider} from "antd";
import React, {useRef, useState} from "react";

export default function () {

  const SPACE = 'column'

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {hidden: true}
    },
    {
      title: '名称',
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
      title: '编号',
      dataIndex: 'code',
      hideInSearch: true,
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
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
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
    await Request(COMMON_DEL(SPACE, id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(COMMON_UPDATE(SPACE), values)
    } else {
      await Request(COMMON_ADD(SPACE), values)
    }
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}
