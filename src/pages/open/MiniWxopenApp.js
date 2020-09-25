import {GET_USER_APPS} from "@/services/apis";
import {Request} from "@/utils/utils";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Avatar} from "antd";
import React from "react";


export default function () {


  const columns = [
    {
      title: 'appId',
      dataIndex: 'appId',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'nickName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInForm: true,
      hideInSearch: true,
      render: (src) => <Avatar src={src}/>
    }
  ];


  async function queryData(params, sorter, filter) {
    return Request(GET_USER_APPS, {params, ...{type: 1}}).then(res => ({
      data: res.list,
      success: true,
      total: res.total
    }))
  }

  return <PageContainer>
    <ProTable
      headerTitle="小程序管理"
      request={queryData}
      columns={columns}
    />
  </PageContainer>
}

