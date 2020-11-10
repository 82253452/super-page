import DelConfirm from '@/components/DelConfirm'
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {CAR_TYPE_ADD, CAR_TYPE_DEL, CAR_TYPE_PAGE, CAR_TYPE_UPDATE} from "@/services/apis";
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
      title: '类型',
      dataIndex: 'type',
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
      title: '车身',
      dataIndex: 'carLength',
      hideInSearch: true,
    },
    {
      title: '载重',
      dataIndex: 'carryingCapacity',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: '可用'
      }
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
    await Request(CAR_TYPE_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(CAR_TYPE_UPDATE, values)
    } else {
      await Request(CAR_TYPE_ADD, values)
    }
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='车型列表' url={CAR_TYPE_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => {setRaw({})
      formRef.current.toggle()}}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}

