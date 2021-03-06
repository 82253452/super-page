import DelConfirm from '@/components/DelConfirm'
import QiniuImg from "@/components/Qiniu/upload";
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {COMMON_ADD, COMMON_ALL, COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Button, Divider, Switch} from "antd";
import React, {useRef, useState} from "react";
import {useQuery} from "react-query";

export default function () {

  const SPACE = 'article'

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()

  const stausEnum = {
    0: '默认',
    1: '已采用',
    2: '已发送',
  }

  const {data: valueEnum = {}} = useQuery('columns', () => Request(COMMON_ALL('column'), {}).then(res => res.reduce((acc, current) => ((acc[current.code] = current.title) && acc), {})))

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {hidden: true},
    },
    {
      title: '栏目',
      dataIndex: 'columnId',
      valueEnum: valueEnum
    },
    {
      title: '头条',
      dataIndex: 'isTop',
      hideInForm: true,
      hideInSearch: true,
      render: (key, row) => <Switch checked={key === 1} onChange={() => handleOnChange(row)}/>
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      copyable: true,
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
      title: '缩略图',
      dataIndex: 'thumbnail',
      hideInSearch: true,
      renderFormItem: () => <QiniuImg max={5}/>,
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
      title: '简介',
      dataIndex: 'summary',
      hideInSearch: true,
      ellipsis: true,
      copyable: true,
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
      title: '视频ID',
      dataIndex: 'videoId',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '作者',
      dataIndex: 'auther',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'del',
      hideInSearch: true,
      valueEnum: stausEnum,
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

  async function handleOnChange(row) {
    await Request(COMMON_UPDATE(SPACE), {...row, isTop: row.isTop === 0 ? 1 : 0})
    actionRef.current.reload()
  }

  async function toggleStatus(row) {
    row.status = row.status === 0 ? 1 : 0
    await Request(COMMON_PAGE(SPACE), row)
    actionRef.current.reload()
  }

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
    <Button type="primary" onClick={() =>{
      setRaw({})
      formRef.current.toggle()
    }}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}
