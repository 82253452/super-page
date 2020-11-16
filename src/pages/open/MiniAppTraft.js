import TablePro from "@/components/TablePro/TablePro";
import {BUSI_APP_DRAFT_TEMPLATE, MINI_APP_TRAFTS} from "@/services/apis";
import {Request} from "@/utils/utils";
import React, {useRef} from "react";


export default function () {

  const actionRef = useRef()


  const columns = [
    {
      title: 'id',
      dataIndex: 'draftId',
      hideInSearch: true,
    },
    {
      title: '版本',
      dataIndex: 'userVersion',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'userDesc',
      hideInSearch: true,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'draftId',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'option',
      render: (_,row) => [<a onClick={() => Request(BUSI_APP_DRAFT_TEMPLATE, {draftId:row.draftId})}>添加</a>],
    },
  ]

  return <TablePro ref={actionRef} title='banner列表' url={MINI_APP_TRAFTS} columns={columns}/>
}
