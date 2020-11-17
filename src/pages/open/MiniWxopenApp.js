import DelConfirm from '@/components/DelConfirm'
import SuperForm from "@/components/SuperForm";
import SuperModal from '@/components/SuperModal'
import TablePro from "@/components/TablePro/TablePro";

import {COMMON_ALL, COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {DownOutlined,} from '@ant-design/icons';
import {Button, Col, DatePicker, Divider, Dropdown, Form, Input, Menu, Row, Select, Switch, Tag} from "antd";
import moment from "moment";
import React, {forwardRef, useRef, useState} from "react";
import {useQuery} from "react-query";
import {useUpdateEffect} from "react-use";

export default function () {

  const SPACE = 'openApp'

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()
  const [data, setData] = useState()

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
      render: (id, raw) => (
        <>
          <a onClick={() => {
            setRaw(raw)
            const d = JSON.parse(raw.messageParam)
            d.time = moment(d.time)
            setData(d)
            formRef.current.toggle()
          }}>推送配置</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]


  async function del(id) {
    await Request(COMMON_DEL(SPACE, id))
    actionRef.current.reload()
  }

  function handleOk() {
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns} param={{type: 1}}>
    <SendConfig ref={formRef} raw={raw} data={data} onOk={handleOk}/>
  </TablePro>
}
const SendConfig = forwardRef(({data,raw, onOk}, ref) => {
  const {data: column = []} = useQuery(COMMON_ALL('column'), () => Request(COMMON_ALL('column')))

  const columns = [
    {
      title: '栏目',
      dataIndex: 'column',
      renderFormItem: () => <Select>
        {column && column.map(c => <Select.Option value={c.code}>{c.title}</Select.Option>)}
      </Select>,
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
      title: '留言',
      dataIndex: 'comment',
      renderFormItem: () => <ColumnSwitch/>,
    },
    {
      title: '发布',
      dataIndex: 'isPush',
      renderFormItem: () => <ColumnSwitch/>,
    },
    {
      title: '原文链接',
      dataIndex: 'url',
    },
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateTime'
    },
    {
      title: '小程序appId',
      dataIndex: 'miniAppId',
    },
    {
      title: '小程序路径',
      dataIndex: 'miniAppPath',
    },
    {
      title: '图文列表',
      dataIndex: 'types',
      renderFormItem: () => <TagSelect/>,
    },
  ];

  async function handleSubmit(values) {
    raw.messageParam = JSON.stringify(values)
    await Request(COMMON_UPDATE('openApp'), raw)
    onOk && onOk()
  }

  return <SuperForm ref={ref} title='推送配置' value={data} columns={columns} onSubmit={handleSubmit}/>
})

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

function ColumnSwitch({value = false, onChange}) {
  const [check, setCheck] = useState(value)

  function handleChange() {
    onChange && onChange(!check)
    setCheck(!check)
  }

  return <Switch checked={check} onChange={handleChange}/>
}
