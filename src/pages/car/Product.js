import QiniuImg from "@/components/Qiniu/upload";
import TablePro from "@/components/TablePro/TablePro";
import {PRODUCT_ADD, PRODUCT_DEL, PRODUCT_PAGE, PRODUCT_UPDATE} from "@/services/apis";
import useVisiableForm from "@/utils/hooks/useVisiableForm";
import {Gen} from "@/utils/IdToCode";
import {Request} from "@/utils/utils";
import {Button, Divider} from "antd";
import React, {useRef} from "react";

export default function () {

  const actionRef = useRef()


  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {hidden: true},
      render: id => <span>{Gen(id)}</span>
    },
    {
      title: '名称',
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
      title: '图片',
      dataIndex: 'img',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => <QiniuImg max={5}/>,
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
      dataIndex: 'price',
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
      title: '数量',
      dataIndex: 'num',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        0: '商品',
        1: '积分商品',
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '下架',
        1: '上架',
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      render: (id, row) => (
        <>
          <a onClick={() => toggleStatus(row)}>{row.status === 0 ? '上架' : '下架'}</a>
          <Divider type="vertical"/>
          <a onClick={() => toggle(row)}>更新</a>
          <Divider type="vertical"/>
          <a onClick={() => del(id)}>删除</a>
        </>
      ),
    },
  ]

  async function toggleStatus(row) {
    row.status = row.status === 0 ? 1 : 0
    await Request(PRODUCT_UPDATE, row)
    actionRef.current.reload()
  }

  async function del(id) {
    await Request(PRODUCT_DEL(id))
    actionRef.current.reload()
  }


  const [Modal, toggle] = useVisiableForm('表单', columns, actionRef, async values => {
    if (values.id) {
      await Request(PRODUCT_UPDATE, values)
    } else {
      await Request(PRODUCT_ADD, values)
    }
    actionRef.current.reload()
  })

  return <TablePro ref={actionRef} title='列表' url={PRODUCT_PAGE} columns={columns} toolBarRender={() => [
    <Button type="primary" onClick={() => toggle()}>
      新建
    </Button>
  ]}>
    <Modal/>
  </TablePro>
}
