import DelConfirm from '@/components/DelConfirm'
import QiniuImg from "@/components/Qiniu/upload";

import SuperForm from "@/components/SuperForm";
import SuperModal from '@/components/SuperModal'
import TablePro from "@/components/TablePro/TablePro";
import {ORDER_DEL, ORDER_PAGE, ORDER_TO_DRIVER, ORDER_UPDATE, SYSUSER_PAGE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Avatar, Divider} from "antd";
import React, {forwardRef, useRef, useState} from "react";
import {Map, Marker, NavigationControl} from "react-bmap";
import {useEffectOnce} from "react-use";


export default function () {

  const actionRef = useRef()
  const formRef = useRef()
  const userRef = useRef()
  const mapRef = useRef()
  const [row, setRow] = useState({})

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInForm: true,
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
      title: '手机号',
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
      title: '价格',
      dataIndex: 'amount',
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
      title: '起点',
      dataIndex: 'addressFrom',
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
      title: '终点',
      dataIndex: 'addressTo',
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
      title: '备注',
      dataIndex: 'des',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '待派单',
        1: '待派送',
        2: '派送中',
        3: '待确认',
        4: '已完结',
        5: '派送取消',
        6: '派送异常',
        7: '派送超时',
      },
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
      title: '操作',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
      render: (id, raw) => (
        <>
          {raw.status === 0 ? <a onClick={() => {
            setRow(raw)
            userRef.current.toggle()
          }
          }>派单</a> : <></>}
          <Divider type="vertical"/>
          <a onClick={() => updateOrder(raw)}>修改订单</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            setRow(raw)
            mapRef.current.toggle()
          }}>位置</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ];


  async function del(id) {
    await Request(ORDER_DEL(id))
    actionRef.current.reload()
  }

  function updateOrder(raw) {
    setRow(raw)
    formRef.current.toggle()
  }

  async function handleSubmit(values) {
    values.id && await Request(ORDER_UPDATE, values)
    actionRef.current.reload()
  }


  return <TablePro ref={actionRef} title='列表' url={ORDER_PAGE} columns={columns}>
    <SuperForm ref={formRef} title='表单' value={row} columns={columns} onSubmit={handleSubmit}/>
    <MapModal ref={mapRef} data={row}/>
    <UserModal ref={userRef} orderId={row.id} tableRef={actionRef}/>
  </TablePro>

}

const UserModal = forwardRef(({orderId, tableRef}, ref) => {

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
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatarurl',
      hideInSearch: true,
      renderFormItem: () => <QiniuImg/>,
      render: src => <Avatar size='small' src={src}/>
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '信誉',
      dataIndex: 'creditScore',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, raw) => (
        <>
          <a onClick={() => confirm(raw)}>确认</a>
        </>
      ),
    },
  ]


  async function confirm(row) {
    await Request(ORDER_TO_DRIVER, {userId: row.id, orderId})
    tableRef.current.reload()
    ref.current.toggle()
  }

  return <SuperModal ref={ref} width={1300}>
    <TablePro ref={actionRef} title='列表' url={SYSUSER_PAGE} columns={columns}/>
  </SuperModal>
})

const MapModal = forwardRef(({data = {}}, ref) => {

  const mapRef = useRef()

  const route = JSON.parse(data?.addressRoute || '[]').map(r => ({lng: r.longitude, lat: r.latitude})) || []

  return <SuperModal ref={ref} width={1300}>
    <Map ref={mapRef} center={{lng: data.longitudeFrom, lat: data.latitudeFrom}}
         enableAutoResize={true}
         enableScrollWheelZoom={true}
         style={{height: '800px'}}
         zoom="8">
      <Driving
        start={{lng: data.longitudeFrom, lat: data.latitudeFrom}}
        end={{lng: data.longitudeTo, lat: data.latitudeTo}}
        route={route}
      />
      <NavigationControl/>
      {route.map(r => <Marker position={{lng: r.lng, lat: r.lat}}/>)}
    </Map>
  </SuperModal>
})

function Driving({policy, autoViewport, start, end, map, route}) {
  const drivingRef = useRef()
  useEffectOnce(() => {
    drivingRef.current = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        policy: policy || 'BMAP_DRIVING_POLICY_LEAST_TIME',
        autoViewport: autoViewport || true,
        viewportOptions: {zoomFactor: -1}
      }
    });
  })
  useEffectOnce(() => {
    drivingRef.current && drivingRef.current.search(new BMap.Point(start.lng, start.lat), new BMap.Point(end.lng, end.lat), {waypoints: route.map(r => new BMap.Point(r.lng, r.lat))});
  })
  return <></>
}
