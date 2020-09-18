import TablePro from "@/components/TablePro/TablePro";
import {ORDER_DEL, ORDER_PAGE, ORDER_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import React, {useRef} from "react";


export default function () {

  const actionRef = useRef()

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInForm: true,
    },
    {
      title: '价格',
      dataIndex: 'amount',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: '待派单',
        1: '待派送',
        2: '派送中',
        3: '待确认',
        4: '已完结',
        5: '派送取消',
        6: '派送异常',
        7: '派送超时',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: id => (
        <>
          <a onClick={() => del(id)}>删除</a>
        </>
      ),
    },
  ];

  async function del(id) {
    await Request(ORDER_DEL(id))
    actionRef.current.reload()
  }

  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(ORDER_UPDATE, values)
    }
    actionRef.current.reload()
  })


  return <TablePro ref={actionRef} title='列表' url={ORDER_PAGE} columns={columns}>
    <Modal/>
  </TablePro>

}
