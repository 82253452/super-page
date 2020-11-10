import {Modal} from "antd";
import React, {forwardRef, useImperativeHandle} from "react";
import {useToggle} from "react-use";

export default forwardRef(({title,width, children,onOk}, ref) => {

  const [on, toggle] = useToggle(false)

  useImperativeHandle(ref, () => ({
    toggle: toggle,
    toggleTabel: () => {
      toggle(!on)
    },
    closeTabel: () => {
      toggle(false)
    },
    openTabel: () => {
      toggle(true)
    }
  }))

  function handleOk(){
    onOk&&onOk()
    toggle(!on)
  }

  return <Modal
    destroyOnClose
    title={title}
    visible={on}
    onOk={handleOk}
    onCancel={() => toggle(false)}
    footer={null}
    width={width}
  >
    {children}
  </Modal>
})
