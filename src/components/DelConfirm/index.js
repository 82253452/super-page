import {Popconfirm} from "antd";
import React from "react";

export default function ({onClick}) {
  return <Popconfirm
    title="确定删除?"
    onConfirm={onClick}
    okText="确定"
    cancelText="取消"
  >
    <a>删除</a>
  </Popconfirm>
}
