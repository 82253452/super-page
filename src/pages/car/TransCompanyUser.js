import DelConfirm from '@/components/DelConfirm'
import TablePro from "@/components/TablePro/TablePro";
import {
  TRANS_COMPANY_DETAIL,
  TRANS_COMPANY_USER_CHECK_USER,
  TRANS_COMPANY_USER_DEL,
  TRANS_COMPANY_USER_PAGE
} from "@/services/apis";
import {Request} from "@/utils/utils";
import {useModel} from "@@/plugin-model/useModel";
import {Card, Descriptions, Divider} from "antd";
import React, {useRef} from "react";
import {useQuery} from "react-query";


export default function () {


  const actionRef = useRef()

  const {initialState} = useModel('@@initialState');

  const {data = {}} = useQuery([TRANS_COMPANY_DETAIL, initialState.currentUser.transId], () => Request(TRANS_COMPANY_DETAIL, {id: initialState.currentUser.transId}))

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
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
      title: '所属物流公司',
      dataIndex: 'transName',
      hideInSearch: true,
    },

    {
      title: '头像',
      dataIndex: 'avatarurl',
      hideInSearch: true,
      valueType: 'avatar'
    },
    {
      title: '联系方式',
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
      title: '车牌号',
      dataIndex: 'carNumber',
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
      title: '车型',
      dataIndex: 'carModel',
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
      title: '车辆图片',
      dataIndex: 'carImg',
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
      title: '用户照片',
      dataIndex: 'userImg',
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
      title: '驾龄',
      dataIndex: 'drivingExperience',
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
      title: '行驶证',
      dataIndex: 'drivingLicense',
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
      title: '驾驶证',
      dataIndex: 'driversLicense',
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
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '待审核',
        1: '通过',
        2: '未通过',
      }
    },
    {
      title: '司机状态',
      dataIndex: 'driverStatus',
      valueEnum: {
        0: '正常',
        1: '请假',
        2: '异常',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
        <>
          {row.status === 0 ? <>
            <Divider type="vertical"/>
            <a onClick={() => checkUser(id, 2)}>拒绝通过</a>
            <Divider type="vertical"/>
            <a onClick={() => checkUser(id, 1)}>审核通过</a>
          </> : <></>}
          {row.status === 2 ? <>
            <Divider type="vertical"/>
            <a onClick={() => checkUser(id, 1)}>审核通过</a>
          </> : <></>}
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ];

  async function del(id) {
    await Request(TRANS_COMPANY_USER_DEL(id))
    actionRef.current.reload()
  }

  async function checkUser(id, status) {
    await Request(TRANS_COMPANY_USER_CHECK_USER, {id, status})
    actionRef.current.reload()
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
