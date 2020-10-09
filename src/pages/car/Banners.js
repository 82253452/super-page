import QiniuImg from "@/components/Qiniu/upload";
import TablePro from "@/components/TablePro/TablePro";
import {BANNER_ADD, BANNER_DEL, BANNER_PAGE, BANNER_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import DelConfirm from '@/components/DelConfirm'
import {Avatar, Button, Divider, Popconfirm} from "antd";
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
      render: (id, row) => (
        <>
          <a onClick={() => toggle(row)}>更新</a>
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


  const [Modal, toggle] = useVisiableForm('新建', columns, actionRef, async values => {
    if (values.id) {
      await Request(BANNER_UPDATE, values)
    } else {
      await Request(BANNER_ADD, values)
    }
    actionRef.current.reload()

  })

  return <TablePro ref={actionRef} title='banner列表' url={BANNER_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <Modal/>
  </TablePro>
}
