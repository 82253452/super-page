import DelConfirm from "@/components/DelConfirm";
import SuperForm from "@/components/SuperForm";
import SuperModal from "@/components/SuperModal";
import TablePro from "@/components/TablePro/TablePro";
import {
  BUSI_APP_AUTH_URL,
  COMMON_PAGE,
  COMMON_UPDATE,
  MINI_APP_ITEMLIST,
  MINI_APP_SUBMIT_APP,
  STATIC_ORDER_LINE
} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Button, Card, Divider, Image, Input, Popover, Select} from "antd";
import React, {forwardRef, useRef, useState} from "react";
import {useQuery} from "react-query";


export default function () {

  const SPACE = 'openApp'

  const actionRef = useRef()
  const formRef = useRef()

  const [temp, setTemp] = useState({})

  const columns = [
    {
      title: 'appId',
      dataIndex: 'appId',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'avatar',
    },
    {
      title: '名称',
      dataIndex: 'nickName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '体验版本号',
      dataIndex: 'testCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '正式版本号',
      dataIndex: 'releaseCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '默认',
        1: '授权成功',
        2: '发版审核中',
        3: '审核通过',
        4: '审核失败',
        5: '发布成功',
        6: '发布失败',
        7: '上传成功',
      }
    },
    {
      title: '操作',
      dataIndex: 'appId',
      hideInSearch: true,
      render: (appId, raw) => (
        <>
          <QrCode appId={appId}/>
          <Divider type="vertical"/>
          <a onClick={() => push(raw)}>发版</a>
          <Divider type="vertical"/>
          <a>删除</a>
        </>
      ),
    },
  ];

  function push(d) {
    setTemp(d)
    formRef.current.toggle()
  }

  const toolBarRender = () =>
    [
      <Button type="primary" onClick={() => {
        Request(BUSI_APP_AUTH_URL).then(r => window.open(r, '微信授权'))
      }}>
        授权
      </Button>
    ]


  return <TablePro ref={actionRef} title='列表' url={COMMON_PAGE(SPACE)} columns={columns} param={{type: 2}}
                   toolBarRender={toolBarRender}>
    <Submit ref={formRef} data={temp} tableRef={actionRef}/>
  </TablePro>
}

function QrCode({appId}) {

  const [src, setSrc] = useState(`https://mass.zhihuizhan.net/common/busiApp/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)

  async function getImg() {
    setSrc(`https://mass.zhihuizhan.net/api/common/getTestQrcode?appId=${appId}&uuid=${Math.random()}`)
  }

  return <Popover content={<Image width={200} height={200} src={src}/>} trigger="click">
    <a onClick={getImg}>预览</a>
  </Popover>
}


const Submit = forwardRef(({tableRef, data}, ref) => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'appId',
      formItemProps: {hidden: true},
    },
    {
      title: '标题',
      dataIndex: 'title',
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
      title: '标签',
      dataIndex: 'tag',
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
      title: '类目',
      dataIndex: 'itemIndex',
      hideInSearch: true,
      renderFormItem: () => <ItemList appId={data.appId}/>,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填字段',
          },
        ],
      },
    },
  ];

  async function handleSubmit(v) {
    await Request(MINI_APP_SUBMIT_APP, v)
    tableRef.current.reload()
  }

  return <SuperForm ref={ref} title='发版' value={data} columns={columns} onSubmit={handleSubmit}/>
})

function ItemList({value, onChange, appId}) {
  const [item, setItem] = useState(value)

  if (!appId) {
    return <></>
  }
  const {data = []} = useQuery(MINI_APP_ITEMLIST, () => Request(MINI_APP_ITEMLIST, {appId}))

  function handleChange(e) {
    setItem(e)
    onChange && onChange(e)
  }

  return <Select
    style={{width: '100%'}}
    placeholder="选择类目"
    onChange={handleChange}
    optionLabelProp="label"
    value={item}
  >
    {data.map((d,i) => <Select.Option key={d.firstId}
                                  label={`${d.firstClass || ''}-${d.secondClass || ''}-${d.thirdClass || ''}`}
                                  value={i}>
      <div>{`${d.firstClass || ''}-${d.secondClass || ''}-${d.thirdClass || ''}`}</div>
    </Select.Option>)}
  </Select>
}
