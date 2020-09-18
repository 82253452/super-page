import TablePro from "@/components/TablePro/TablePro";
import {
  TRANS_COMPANY_DETAIL,
  TRANS_COMPANY_USER_CHECK_USER,
  TRANS_COMPANY_USER_DEL,
  TRANS_COMPANY_USER_PAGE
} from "@/services/apis";
import {Request} from "@/utils/utils";
import {useModel} from "@@/plugin-model/useModel";
import {Avatar, Card, Descriptions, Divider} from "antd";
import React, {useRef} from "react";
import {useQuery} from "react-query";


export default function () {

  console.log('transpage')

  const actionRef = useRef()

  const {initialState} = useModel('@@initialState');

  const {data = {}} = useQuery([TRANS_COMPANY_DETAIL, initialState.currentUser.transId], () => Request(TRANS_COMPANY_DETAIL, {id: initialState.currentUser.transId}))

  const columns = [
    {
      title: '用户名',
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatarurl',
      hideInSearch: true,
      render: (src) => <Avatar src={src}/>
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
        <>
          <a onClick={() => checkUser(row)}>派单</a>
          {row.status === 0 ? <>
            <Divider type="vertical"/>
            <a onClick={() => checkUser(id, 2)}>不通过</a>
            <Divider type="vertical"/>
            <a onClick={() => checkUser(id, 1)}>审核通过</a>
          </> : <></>}
          <Divider type="vertical"/>
          <a onClick={() => del(id)}>删除</a>
        </>
      ),
    },
  ];

  async function del(id) {
    await Request(TRANS_COMPANY_USER_DEL(id))
    actionRef.current.reload()
  }

  function checkUser(id, status) {
    Request(TRANS_COMPANY_USER_CHECK_USER, {id, status})
  }


  return <TablePro ref={actionRef} title='列表' url={TRANS_COMPANY_USER_PAGE} columns={columns}
                   tableExtraRender={() => data ? <Card>
                     <Descriptions>
                       <Descriptions.Item label="物流公司">{data.name}</Descriptions.Item>
                       <Descriptions.Item label="地址">{data.address}</Descriptions.Item>
                       <Descriptions.Item label="法人">{data.address}</Descriptions.Item>
                       <Descriptions.Item label="法人联系方式">{data.address}</Descriptions.Item>
                       <Descriptions.Item label="负责人">{data.legalPerson}</Descriptions.Item>
                       <Descriptions.Item label="负责人联系方式">{data.legalPhone}</Descriptions.Item>
                     </Descriptions>
                   </Card> : <></>}/>
}