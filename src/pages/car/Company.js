import DelConfirm from '@/components/DelConfirm'
import QiniuImg from '@/components/Qiniu/upload'
import TablePro from "@/components/TablePro/TablePro";
import {COMPANY_ADD, COMPANY_CHECK, COMPANY_DEL, COMPANY_PAGE, COMPANY_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Divider} from "antd";
import React, {useRef} from "react";

export default function () {

  const actionRef = useRef()


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
      hideInTable: true,
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
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: '未审核',
        1: '通过',
        2: '未通过'
      }
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
      render: (id, row) => (
        <>
          <Divider type="vertical"/>
          <a onClick={() => toggle(row)}>更新</a>
          {row.status === 0 ? <>
            <Divider type="vertical"/>
            <a onClick={() => check(id, 2)}>拒绝通过</a>
            <Divider type="vertical"/>
            <a onClick={() => check(id, 1)}>审核通过</a>
          </> : <></>}
          {row.status === 2 ? <>
            <Divider type="vertical"/>
            <a onClick={() => check(id, 1)}>审核通过</a>
          </> : <></>}
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]

  async function del(id) {
    await Request(COMPANY_DEL(id))
    actionRef.current.reload()
  }

  async function check(id, status) {
    await Request(COMPANY_CHECK, {id, status})
    actionRef.current.reload()
  }

  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(COMPANY_UPDATE, values)
    } else {
      await Request(COMPANY_ADD, values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='列表' url={COMPANY_PAGE} columns={columns}>
    {Modal}
  </TablePro>
}
