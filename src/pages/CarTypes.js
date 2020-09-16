import TablePro from "@/components/TablePro/TablePro";
import {CAR_TYPE_PAGE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Button, Divider} from "antd";
import React, {useRef} from "react";


export default function () {

  const actionRef = useRef()


  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      form: () => <div>123312</div>,
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => (
        <>
          <a onClick={() => toggle(row)}>更新</a>
          <Divider type="vertical"/>
          <a onClick={() => toggle(row)}>删除</a>
        </>
      ),
    },
  ]


  const [CarTypes, toggle] = useVisiableForm('新建', columns, actionRef, values => {
    console.log(values)
  })

  return <TablePro ref={actionRef} title='车型列表' url={CAR_TYPE_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <CarTypes/>
  </TablePro>
}
