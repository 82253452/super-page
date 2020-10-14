import TablePro from "@/components/TablePro/TablePro";
import {BUSI_APP_DEL_TEMPLATE, MINI_APP_PAGE, MINI_APP_TEMPLATES, MINI_APP_UPLOAD} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Request} from "@/utils/utils";
import {Divider, Input, Select} from "antd";
import Text from "antd/es/typography/Text";
import React, {useRef} from "react";
import {useQuery} from "react-query";

export default function () {

  const actionRef = useRef()


  const columns = [
    {
      title: 'id',
      dataIndex: 'templateId',
      hideInSearch: true,
    },
    {
      title: '版本',
      dataIndex: 'userVersion',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'userDesc',
      hideInSearch: true,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'templateId',
      hideInForm: true,
      hideInSearch: true,
      render: (templateId, row) => (
        <>
          <a onClick={() => toggle(row)}>设为体验版</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            Request(BUSI_APP_DEL_TEMPLATE, {templateId})
            actionRef.current.reload()
          }}>删除</a>
        </>
      ),
    },
  ]

  const [MiniApp, toggle] = useVisiableForm("选择小程序", [{
    title: '小程序',
    dataIndex: 'appId',
    renderFormItem: () => <MiniList/>
  },
    {
      title: '模板',
      dataIndex: 'templateId',
    }], actionRef, v => Request(MINI_APP_UPLOAD, v))


  return <TablePro ref={actionRef} title='列表' url={MINI_APP_TEMPLATES} columns={columns}>
    {MiniApp}
  </TablePro>
}

function MiniList({value, onChange}) {
  console.log('minilist')
  const {data} = useQuery(MINI_APP_PAGE, () => Request(MINI_APP_PAGE).then(r => r.list.map(l => ({
    value: l.appId,
    label: l.nickName,
  }))))

  return <Select options={data} label="小程序" onChange={(e) => {
    console.log(e)
    onChange(e);
  }}/>
}
