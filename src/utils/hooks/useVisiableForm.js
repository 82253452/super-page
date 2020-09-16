import ProTable from "@ant-design/pro-table";
import {Modal, notification} from "antd";
import React, {useState} from "react";
import {useToggle} from "react-use";

export default function (title, columns, actionRef, confirm, initialValues = {}) {

  const [initialValue, setInitialValue] = useState(initialValue)

  const [on, toggle] = useToggle(false)

  function toggleForm(init = {}) {
    setInitialValue(init)
    toggle(!on)
  }

  return [() => <Modal
    destroyOnClose
    title={title}
    visible={on}
    onCancel={() => toggle(false)}
    footer={null}
    width={1200}
  >
    <ProTable
      form={{initialValues: initialValue}}
      onSubmit={async (value) => {
        confirm && confirm(value)
        toggle()
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}
      rowKey="key"
      type="form"
      columns={columns}
    />
  </Modal>, toggleForm]

}
