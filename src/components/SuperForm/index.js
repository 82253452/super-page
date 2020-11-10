import SuperModal from '@/components/SuperModal'
import ProTable from "@ant-design/pro-table";
import React, {forwardRef, useRef} from "react";

export default forwardRef(({title, columns, value, onSubmit}, ref) => {

  return <SuperModal ref={ref} title={title}>
    <ProTable
      form={{initialValues: value}}
      onSubmit={async (value) => {
        onSubmit && await onSubmit(value)
        ref.current.toggle()
      }}
      rowKey="key"
      type="form"
      columns={columns}
    />
  </SuperModal>

})
