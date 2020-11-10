import DelConfirm from '@/components/DelConfirm'
import QiniuImg from '@/components/Qiniu/upload'
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {TRANS_COMPANY_ADD, TRANS_COMPANY_DEL, TRANS_COMPANY_PAGE, TRANS_COMPANY_UPDATE} from "@/services/apis";
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
      title: '物流代码',
      dataIndex: 'id',
      hideInSearch: true,
      formItemProps: {hidden: true},
      render: id => <span>{Gen(id)}</span>
    },
    {
      title: '名称',
      dataIndex: 'name',
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
      title: '营业执照',
      dataIndex: 'businessLicense',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => <QiniuImg/>,
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
      title: '公司法人',
      dataIndex: 'legalPerson',
      hideInSearch: true,
      hideInTable: true,
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
      title: '法人手机',
      dataIndex: 'legalPhone',
      hideInSearch: true,
      hideInTable: true,
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
      title: '公司地址',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '公司联系人',
      dataIndex: 'contactsPerson',
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
      title: '联系人手机',
      dataIndex: 'contactsPhone',
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
      title: '公司邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
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
    await Request(TRANS_COMPANY_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(TRANS_COMPANY_UPDATE, values)
    } else {
      await Request(TRANS_COMPANY_ADD, values)
    }
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='列表' url={TRANS_COMPANY_PAGE} columns={columns} toolBarRender={() => [
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
