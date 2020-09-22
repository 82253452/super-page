import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Alert, Card, Col, Divider, Row, Timeline} from 'antd';
import Meta from "antd/es/card/Meta";


export default (): React.ReactNode => (
  <PageContainer>
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="待派单数" hoverable>
          <Meta title="1233" description=""/>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="总订单数" hoverable>
          <div>总订单数</div>
          <p>12300</p>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="司机数" hoverable>
          <div>总订单数</div>
          <p>12300</p>
        </Card>
      </Col>
      <Col className="gutter-row" span={6}>
        <Card size="small" title="物流公司数" hoverable>
          <div>总订单数</div>
          <p>12300</p>
        </Card>
      </Col>
    </Row>
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
);
