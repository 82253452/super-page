import {GET_USER_APPS} from "@/services/apis";
import {Request} from "@/utils/utils";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Avatar, Button, Divider, Image, Popover} from "antd";
import React, {useState} from "react";


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
    },
    {
      title: '操作',
      dataIndex: 'appId',
      render: (appId) => (
        <>
          <QrCode appId={appId}/>
          <Divider type="vertical"/>
          <a>发版</a>
          <Divider type="vertical"/>
          <a>删除</a>
        </>
      ),
    },
  ];

  function handleModalVisible() {

  }

  async function queryData(params, sorter, filter) {
    return Request(GET_USER_APPS, {params, ...{type: 2}}).then(res => ({
      data: res.list,
      success: true,
      total: res.total
    }))
  }

  return <PageContainer>
    <ProTable
      headerTitle="小程序管理"
      toolBarRender={() => [
        <Button type="primary" onClick={() => handleModalVisible(true)}>
          授权
        </Button>,
      ]}
      request={queryData}
      columns={columns}
    />
  </PageContainer>
}

function QrCode({appId}) {

  console.log(process.env)

  const [src, setSrc] = useState(`https://mass.zhihuizhan.net/common/busiApp/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)

  async function getImg() {
    setSrc(`https://mass.zhihuizhan.net/api/common/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)
  }

  return <Popover content={<Image width={200} height={200} src={src}/>}>
    <a onClick={getImg}>预览</a>
  </Popover>
}
