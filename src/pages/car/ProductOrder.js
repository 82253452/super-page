import DelConfirm from '@/components/DelConfirm'
import SuperForm from "@/components/SuperForm";
import SuperModal from '@/components/SuperModal'
import TablePro from "@/components/TablePro/TablePro";
import {COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Card, Divider, Input} from 'antd';
import React, {forwardRef, useRef, useState} from "react";

const SPACE = 'productOrder'

export default function () {

  const actionRef = useRef()
  const formRef = useRef()
  const courierRef = useRef()
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInForm: true,
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '价格',
      dataIndex: 'amount',
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
      title: '订单描述',
      dataIndex: 'des',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '未付款',
        1: '待发货',
        2: '待收货',
        3: '已完成',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
      render: (id, raw) => (
        <>
          <a hidden={raw.status !== 1} onClick={() => courierShow(raw)}>发货</a>
          <Divider hidden={raw.status !== 1} type="vertical"/>
          <a onClick={() => updateOrder(raw)}>修改订单</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ];

  const [raw, setRaw] = useState()

  function courierShow(raw) {
    setRaw(raw)
    courierRef.current.toggle()
  }

  async function del(id) {
    await Request(COMMON_DEL(SPACE, id))
    actionRef.current.reload()
  }

  function updateOrder(raw) {
    setRaw(raw)
    formRef.current.toggle()
  }

  async function handleSubmit(values) {
    values.id && await Request(COMMON_UPDATE(SPACE), values)
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns}>
    <Courier tableRef={actionRef} data={raw}/>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}

const Courier = forwardRef(({tableRef, data}, ref) => {
  const [value, setValue] = useState(data)

  async function handleOk() {
    await Request(COMMON_UPDATE(SPACE), {...data, status: 2})
    tableRef.current.reload()
  }

  return <SuperModal ref={ref} width={300} onOk={handleOk}>
    <Card>
      <Input placeholder="请输入快递单号" onChange={e => setValue({...value, courierNo: e.target.value})}/>
    </Card>
  </SuperModal>

})
