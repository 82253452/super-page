import DelConfirm from '@/components/DelConfirm'
import TablePro from "@/components/TablePro/TablePro";
import {COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Divider} from "antd";
import React, {useRef} from "react";


export default function () {

  const SPACE = 'productOrder'
  const actionRef = useRef()

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
      hideInForm: true,
      valueEnum: {
        0: '未付款',
        1: '已付款',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
      render: (id, raw) => (
        <>
          <a onClick={() => updateOrder(raw)}>修改订单</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ];

  async function del(id) {
    await Request(COMMON_DEL(SPACE, id))
    actionRef.current.reload()
  }

  function updateOrder(raw) {
    toggle(raw)
  }

  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(COMMON_UPDATE(SPACE), values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns}>
    {Modal}
  </TablePro>

}

