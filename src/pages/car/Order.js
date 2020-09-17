import {ORDER_PAGE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Avatar} from "antd";
import React from "react";


export default function () {

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
        0: '待接单'
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

  async function del() {

  }

  async function queryData(params, sorter, filter) {
    return Request(ORDER_PAGE, {...params, status: 0}).then(res => ({
      data: res.list,
      success: true,
      total: res.total
    }))
  }

  return <PageContainer>
    <ProTable
      headerTitle="订单列表"
      request={queryData}
      columns={columns}
    />
  </PageContainer>
}
