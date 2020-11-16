import TablePro from "@/components/TablePro/TablePro";
import {BUSI_APP_AUTH_URL, COMMON_PAGE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Button, Divider, Image, Popover} from "antd";
import React, {useRef, useState} from "react";


export default function () {

  const SPACE = 'openApp'

  const actionRef = useRef()

  const columns = [
    {
      title: 'appId',
      dataIndex: 'appId',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'avatar',
    },
    {
      title: '名称',
      dataIndex: 'nickName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'appId',
      hideInSearch: true,
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

  const toolBarRender = () =>
    [
      <Button type="primary" onClick={() => {
        Request(BUSI_APP_AUTH_URL).then(r => window.open(r, '微信授权'))
      }}>
        授权
      </Button>
    ]


  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns} param={{type: 2}}
                   toolBarRender={toolBarRender}/>
}

function QrCode({appId}) {

  const [src, setSrc] = useState(`https://mass.zhihuizhan.net/common/busiApp/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)

  async function getImg() {
    setSrc(`https://mass.zhihuizhan.net/api/common/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)
  }

  return <Popover content={<Image width={200} height={200} src={src}/>} trigger="click">
    <a onClick={getImg}>预览</a>
  </Popover>
}
