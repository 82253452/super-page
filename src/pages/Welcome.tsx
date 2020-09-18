import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Alert, Card, Timeline} from 'antd';


export default (): React.ReactNode => (
  <PageContainer>
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
  </PageContainer>
);
