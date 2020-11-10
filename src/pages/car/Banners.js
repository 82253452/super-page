import DelConfirm from '@/components/DelConfirm'
import QiniuImg from "@/components/Qiniu/upload";
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {BANNER_ADD, BANNER_DEL, BANNER_PAGE, BANNER_UPDATE} from "@/services/apis";
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
      hideInTable: true,
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
      title: '图片',
      dataIndex: 'src',
      hideInSearch: true,
      renderFormItem: () => <QiniuImg/>,
      valueType: 'avatar',
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
      title: '跳转地址',
      dataIndex: 'href',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, raw) => (
        <>
          <a onClick={() => {setRaw(raw)
            formRef.current.toggle()}}>更新</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]

  async function del(id) {
    await Request(BANNER_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(BANNER_UPDATE, values)
    } else {
      await Request(BANNER_ADD, values)
    }
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='banner列表' url={BANNER_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => {setRaw({})
      formRef.current.toggle()}}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}
