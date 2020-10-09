import DelConfirm from '@/components/DelConfirm'
import TablePro from "@/components/TablePro/TablePro";
import {COMMON_ALL, COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import useModal from "@/utils/hooks/useModal";
import {Request} from "@/utils/utils";
import {DownOutlined,} from '@ant-design/icons';
import {Button, Col, DatePicker, Divider, Dropdown, Form, Input, Menu, Row, Select, Switch, Tag} from "antd";
import moment from "moment";
import React, {useRef, useState} from "react";
import {useQuery} from "react-query";

export default function () {

  const SPACE = 'openApp'

  const actionRef = useRef()


  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {hidden: true},
    },
    {
      title: 'APP_ID',
      dataIndex: 'appId',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInSearch: true,
      valueType: 'avatar',
    },
    {
      title: '简介',
      dataIndex: 'signature',
      hideInSearch: true,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
        <>
          <a onClick={() => toggle(row)}>推送配置</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]

  const [Modal, toggle] = useSendConfig({actionRef})

  async function del(id) {
    await Request(COMMON_DEL(SPACE, id))
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns} param={{type: 1}}>
    <Modal/>
  </TablePro>
}

function useSendConfig({actionRef}) {
  const formRef = useRef()
  const {data: column = []} = useQuery(COMMON_ALL('column'), () => Request(COMMON_ALL('column')))

  const [data = {}, setData] = useState()
  const [row, setRow] = useState()
  const [Modal, toggle] = useModal()

  function toggleForm(row) {
    const d = JSON.parse(row.messageParam)
    d.time = moment(d.time)
    setData(d)
    setRow(row)
    toggle()
  }

  async function handleOk() {
    formRef.current.submit()
  }

  async function submit(values) {
    row.messageParam = JSON.stringify(values)
    await Request(COMMON_UPDATE('openApp'), row)
    actionRef.current.reload()
    toggle()
  }

  return [() => <Modal title='推送配置' onOk={handleOk}>
    <Form
      ref={formRef}
      name="basic"
      onFinish={submit}
      initialValues={data}
    >
      <Form.Item
        label="栏目"
        name="column"
        rules={[{required: true, message: '请选择栏目!'}]}
      >
        <Select>
          {column && column.map(c => <Select.Option value={c.code}>{c.title}</Select.Option>)}
        </Select>
      </Form.Item>
      <Row>
        <Col span={12}><Form.Item
          label="留言"
          name="comment"
          valuePropName="checked"
        >
          <Switch/>
        </Form.Item></Col>
        <Col span={12}>
          <Form.Item
            label="发布"
            name="isPush"
            valuePropName="checked"
          >
            <Switch/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="原文链接"
        name="url"
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="时间"
        name="time"
      >
        <DatePicker showTime format='YYYY/MM/DD HH:mm:ss'/>
      </Form.Item>
      <Form.Item
        label="小程序appId"
        name="miniAppId"
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="小程序路径"
        name="miniAppPath"
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="图文列表"
        name="types"
      >
        <TagSelect/>
      </Form.Item>
    </Form>
  </Modal>, toggleForm]
}

function TagSelect({value = '', onChange}) {

  const [data, setData] = useState(value.split('-'))

  const typeMap = {
    0: '视频',
    1: '文章',
    2: '视频头条',
    3: '文章头条',
    4: '小程序视频',
    5: '小程序头条视频'
  }

  const menu = (
    <Menu>
      {Object.keys(typeMap).map((k, i) => <Menu.Item key={i} onClick={() => onAdd(k)}>{typeMap[k]}</Menu.Item>)}
    </Menu>
  )

  function onClose(e) {
    data.splice(e, 1)
    onChange(data.join('-'))
  }

  function onAdd(e) {
    setData([...data, e])
    onChange(data.join('-'))
  }

  return (
    <div>
      {data.map((d, i) => <Tag key={i} closable onClose={() => onClose(i)}>{typeMap[d]}</Tag>)}
      <Dropdown overlay={menu} disabled={data.length >= 8}>
        <Button size='small'>
          + <DownOutlined/>
        </Button>
      </Dropdown>
    </div>

  )
}
