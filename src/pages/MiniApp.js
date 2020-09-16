import {MINI_APP_PAGE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Avatar, Button, Divider} from "antd";
import React from "react";
import {useToggle} from "react-use";


export default function () {

  const [on, toggle] = useToggle(false);

  const columns = [
    {
      title: 'appId',
      dataIndex: 'appId',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
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
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a>预览</a>
          <Divider type="vertical"/>
          <a>发版</a>
          <Divider type="vertical"/>
          <a href="">删除</a>
        </>
      ),
    },
  ];

  function handleModalVisible() {

  }

  async function queryData(params, sorter, filter) {
    return Request(MINI_APP_PAGE, {params}).then(res => ({
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
