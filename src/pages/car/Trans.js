import TablePro from "@/components/TablePro/TablePro";
import {
  BANNER_DEL,
  TRANS_COMPANY_ADD,
  TRANS_COMPANY_DEL,
  TRANS_COMPANY_PAGE,
  TRANS_COMPANY_UPDATE
} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Button, Divider} from "antd";
import React, {useRef} from "react";
import QiniuImg from '@/components/Qiniu/upload'

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
    },
    {
      title: '营业执照',
      dataIndex: 'businessLicense',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => <QiniuImg/>
    },
    {
      title: '公司法人',
      dataIndex: 'legalPerson',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '法人手机',
      dataIndex: 'legalPhone',
      hideInSearch: true,
      hideInTable: true
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
    },
    {
      title: '联系人手机',
      dataIndex: 'contactsPhone',
      hideInSearch: true,
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
      render: (id, row) => (
        <>
          <a onClick={() => toggle(row)}>更新</a>
          <Divider type="vertical"/>
          <a onClick={() => del(id)}>删除</a>
        </>
      ),
    },
  ]

  async function del(id) {
    await Request(TRANS_COMPANY_DEL(id))
    actionRef.current.reload()
  }


  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(TRANS_COMPANY_UPDATE, values)
    } else {
      await Request(TRANS_COMPANY_ADD, values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='列表' url={TRANS_COMPANY_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <Modal/>
  </TablePro>
}
