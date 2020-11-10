import DelConfirm from '@/components/DelConfirm'
import QiniuImg from "@/components/Qiniu/upload";
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {PRODUCT_ADD, PRODUCT_DEL, PRODUCT_PAGE, PRODUCT_UPDATE} from "@/services/apis";
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
      hideInTable: true,
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
      title: '图片',
      dataIndex: 'img',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => <QiniuImg max={5}/>,
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
      title: '价格',
      dataIndex: 'price',
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
      title: '数量',
      dataIndex: 'num',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        0: '商品',
        1: '积分商品',
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '下架',
        1: '上架',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, raw) => (
        <>
          <a onClick={() => toggleStatus(raw)}>{raw.status === 0 ? '上架' : '下架'}</a>
          <Divider type="vertical"/>
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

  async function toggleStatus(raw) {
    raw.status = raw.status === 0 ? 1 : 0
    await Request(PRODUCT_UPDATE, raw)
    actionRef.current.reload()
  }

  async function del(id) {
    await Request(PRODUCT_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(PRODUCT_UPDATE, values)
    } else {
      await Request(PRODUCT_ADD, values)
    }
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='列表' url={PRODUCT_PAGE} columns={columns} toolBarRender={() => [
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
