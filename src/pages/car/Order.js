import QiniuImg from "@/components/Qiniu/upload";
import TablePro from "@/components/TablePro/TablePro";
import {ORDER_DEL, ORDER_PAGE, ORDER_TO_DRIVER, ORDER_UPDATE, SYSUSER_PAGE} from "@/services/apis";
import useModal from "@/utils/hooks/useModal";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Avatar, Divider} from "antd";
import React, {useRef, useState} from "react";


export default function () {

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
      title: '手机号',
      dataIndex: 'phone',
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
      title: '起点',
      dataIndex: 'addressFrom',
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
      title: '终点',
      dataIndex: 'addressTo',
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
      title: '备注',
      dataIndex: 'des',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
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
      },
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
      hideInSearch: true,
      hideInForm: true,
      render: (id, raw) => (
        <>
          {raw.status === 0 ? <a onClick={() => setId(id)}>派单</a> : <></>}
          <Divider type="vertical"/>
          <a onClick={() => updateOrder(raw)}>修改订单</a>
          <Divider type="vertical"/>
          <a onClick={() => del(id)}>删除</a>
        </>
      ),
    },
  ];

  async function del(id) {
    await Request(ORDER_DEL(id))
    actionRef.current.reload()
  }

  function updateOrder(raw) {
    toggle(raw)
  }

  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(ORDER_UPDATE, values)
    }
    actionRef.current.reload()
  })

  function reload() {

  }

  const [UserModal, setId] = useUserModal(reload)


  return <TablePro ref={actionRef} title='列表' url={ORDER_PAGE} columns={columns}>
    <Modal/>
    <UserModal/>
  </TablePro>

}

function useUserModal(reload) {
  const actionRef = useRef()
  const [orderId, setOrderId] = useState()

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {hidden: true}
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatarurl',
      hideInSearch: true,
      renderFormItem: () => <QiniuImg/>,
      render: src => <Avatar size='small' src={src}/>
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '信誉',
      dataIndex: 'creditScore',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
        <>
          <a onClick={() => confirm(row)}>确认</a>
        </>
      ),
    },
  ]

  const [Modal, toggle] = useModal('', 1300)

  async function confirm(row) {
    await Request(ORDER_TO_DRIVER, {userId: row.id, orderId})
    reload && reload()
    toggle()
  }

  function setId(id) {
    setOrderId(id)
    toggle()
  }

  return [() => <Modal>
    <TablePro ref={actionRef} title='列表' url={SYSUSER_PAGE} columns={columns}/>
  </Modal>, setId, toggle]
}
