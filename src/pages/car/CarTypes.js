import TablePro from "@/components/TablePro/TablePro";
import {
  BANNER_ADD,
  BANNER_UPDATE, CAR_TYPE_ADD,
  CAR_TYPE_DEL,
  CAR_TYPE_PAGE,
  CAR_TYPE_UPDATE,
  TRANS_COMPANY_DEL
} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Button, Divider, Input} from "antd";
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
      dataIndex: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
    },
    {
      title: '车身',
      dataIndex: 'carLength',
      hideInSearch: true,
    },
    {
      title: '载重',
      dataIndex: 'carryingCapacity',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: '可用'
      }
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
    await Request(CAR_TYPE_DEL(id))
    actionRef.current.reload()
  }


  const [CarTypes, toggle] = useVisiableForm('新建', columns, actionRef, async values => {
    if (values.id) {
      await Request(CAR_TYPE_UPDATE, values)
    } else {
      await Request(CAR_TYPE_ADD, values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='车型列表' url={CAR_TYPE_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <CarTypes/>
  </TablePro>
}

function Hidden({value}) {
  return <Input value={value} hidden={true}/>
}
