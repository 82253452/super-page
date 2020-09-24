import {STATIC_DRIVER_LINE, STATIC_INDEX, STATIC_ORDER_LINE, STATIC_USER_LINE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {PageContainer} from '@ant-design/pro-layout';
import {Alert, Card, Col, Divider, Row, Statistic, Timeline} from 'antd';
import React from 'react';
import {Chart} from "react-charts";
import {useQuery} from "react-query";


export default function () {

  const {data: indexData = []} = useQuery(STATIC_INDEX, () => Request(STATIC_INDEX))

  const {data: orderData = []} = useQuery(STATIC_ORDER_LINE, () => Request(STATIC_ORDER_LINE).then(r => r.map(t => ({
    primary: new Date(t.time),
    secondary: t.num
  }))))
  const {data: driverData = []} = useQuery(STATIC_DRIVER_LINE, () => Request(STATIC_DRIVER_LINE).then(r => r.map(t => ({
    primary: new Date(t.time),
    secondary: t.num
  }))))

  const {data: userData = []} = useQuery(STATIC_USER_LINE, () => Request(STATIC_USER_LINE).then(r => r.map(t => ({
    primary: new Date(t.time),
    secondary: t.num
  }))))

  const data = React.useMemo(
    () => [
      {
        label: '订单增长',
        data: orderData
      },
      {
        label: '注册司机增长',
        data: driverData
      },
      {
        label: '注册用户增长',
        data: userData
      },
    ],
    [orderData, driverData, userData]
  )


  const axes = React.useMemo(
    () => [
      {type: 'linear', position: 'left'},
      {primary: true, type: 'time', position: 'bottom'},
    ],
    []
  )

  return <PageContainer>
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <Card size="small" hoverable>
          <Statistic title="待派单数" value={indexData.preOrderNum}/>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="" hoverable>
          <Statistic title="总订单数" value={indexData.totalOrderNum}/>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="" hoverable>
          <Statistic title="司机数" value={indexData.driverNum}/>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="" hoverable>
          <Statistic title="物流公司数" value={indexData.transNum}/>
        </Card>
      </Col>
    </Row>
    <Divider orientation="left"/>
    <Card title='数据增长量'>
      <div
        style={{
          height: '300px',
        }}
      >
        <Chart data={data} axes={axes} tooltip/>
      </div>
    </Card>

    <Divider orientation="left">更新计划</Divider>
    <Row gutter={16}>
      <Col className="gutter-row" span={12}>
        <Card>
          <Alert
            message="后台更新计划"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
          <Timeline>
            <Timeline.Item>2015-09-16 用户权限-车辆管理 </Timeline.Item>
            <Timeline.Item>2015-09-17 物流公司下人员管理-审核</Timeline.Item>
            <Timeline.Item>2015-09-18 物流公司审核-企业认证</Timeline.Item>
            <Timeline.Item>2015-09-19 订单流程后台</Timeline.Item>
          </Timeline>,
        </Card>
      </Col>
      <Col className="gutter-row" span={12}>
        <Card>
          <Alert
            message="小程序更新计划"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
          <Timeline>
            <Timeline.Item>2015-09-16 用户权限</Timeline.Item>
            <Timeline.Item>2015-09-17 物流公司-认证公司</Timeline.Item>
            <Timeline.Item>2015-09-18 物流公司审核-企业认证 </Timeline.Item>
            <Timeline.Item>2015-09-19 订单流程</Timeline.Item>
          </Timeline>,
        </Card>
      </Col>
    </Row>
  </PageContainer>
}
