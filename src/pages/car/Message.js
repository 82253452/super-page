import DelConfirm from '@/components/DelConfirm'
import QiniuImg from '@/components/Qiniu/upload'
import TablePro from "@/components/TablePro/TablePro";
import {MESSAGE_ADD, MESSAGE_DEL, MESSAGE_PAGE, MESSAGE_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Gen} from "@/utils/IdToCode";
import {Request} from "@/utils/utils";
import {Button, Divider} from "antd";
import React, {useRef} from "react";

export default function () {

  const actionRef = useRef()


  const columns = [
    {
      title: '消息id',
      dataIndex: 'id',
      hideInSearch: true,
      formItemProps: {hidden: true},
      render: id => <span>{Gen(id)}</span>
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
      dataIndex: 'content',
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
          <a onClick={() => toggle(row)}>更新</a>
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


  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(MESSAGE_UPDATE, values)
    } else {
      await Request(MESSAGE_ADD, values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='列表' url={MESSAGE_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    {Modal}
  </TablePro>
}
