import DelConfirm from '@/components/DelConfirm'
import QiniuImg from '@/components/Qiniu/upload'
import SuperForm from "@/components/SuperForm";
import TablePro from "@/components/TablePro/TablePro";
import {SYSUSER_ADD, SYSUSER_DEL, SYSUSER_PAGE, SYSUSER_ROLES, SYSUSER_UPDATE} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Avatar, Button, Divider, Select, Tag} from "antd";
import React, {useRef, useState} from "react";
import {useQuery} from "react-query";

export default function () {

  const actionRef = useRef()
  const formRef = useRef()
  const [raw, setRaw] = useState()

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
      title: '头像',
      dataIndex: 'avatarurl',
      hideInSearch: true,
      renderFormItem: () => <QiniuImg/>,
      render: src => <Avatar size='small' src={src}/>,
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
      title: '用户名',
      dataIndex: 'userName',
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
      title: '信誉',
      dataIndex: 'creditScore',
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
      title: '余额',
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
      title: '账户类型',
      dataIndex: 'type',
      hideInSearch: true,
      valueEnum: {
        0: '系统账户',
        1: '物流公司',
        2: '司机',
        3: '企业用户'
      }
    },
    {
      title: '角色',
      dataIndex: 'roles',
      hideInSearch: true,
      render: value => <Roles value={value}/>,
      renderFormItem: () => <RolesForm/>,
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
            formRef.current.toggle()
          }}>更新</a>
          <Divider type="vertical"/>
          <DelConfirm onClick={() => del(id)}/>
        </>
      ),
    },
  ]

  async function del(id) {
    await Request(SYSUSER_DEL(id))
    actionRef.current.reload()
  }

  async function handleSubmit(values) {
    if (values.id) {
      await Request(SYSUSER_UPDATE, values)
    } else {
      await Request(SYSUSER_ADD, values)
    }
    actionRef.current.reload()
  }

  return <TablePro ref={actionRef} title='列表' url={SYSUSER_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => {
      setRaw({})
      formRef.current.toggle()
    }}>
      新建
    </Button>
  ]}>
    <SuperForm ref={formRef} title='表单' value={raw} columns={columns} onSubmit={handleSubmit}/>
  </TablePro>
}

function Roles({value = []}) {
  return <div>
    {value.map(v => <Tag key={v.id} color="magenta">{v.remark}</Tag>)}
  </div>
}

function RolesForm({value = [], onChange}) {
  const {data = []} = useQuery(SYSUSER_ROLES, () => Request(SYSUSER_ROLES))

  function handleChange(e) {
    onChange && onChange(data.filter(d => e.some(s => s === d.id)))
  }

  return <Select
    mode="multiple"
    style={{width: '100%'}}
    placeholder="选择角色"
    onChange={handleChange}
    optionLabelProp="label"
    value={value.map(v => v.id)}
  >
    {data.map(d => <Select.Option key={d.id} value={d.id} label={d.remark}>
      <div>{d.remark}</div>
    </Select.Option>)}
  </Select>
}
