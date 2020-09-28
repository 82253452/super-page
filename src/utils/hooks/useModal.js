import {Modal} from "antd";
import React, {useState} from "react";
import {useToggle} from "react-use";

export default function () {

  const [initialValue, setInitialValue] = useState(initialValue)

  const [on, toggleOn] = useToggle(false)

  function toggle(init = {}) {
    setInitialValue(init)
    toggleOn(!on)
  }

  return [({width = 500, title = '', footer, onOk, children}) => <Modal
    destroyOnClose
    title={title}
    visible={on}
    onOk={onOk}
    onCancel={() => toggle(false)}
    footer={footer}
    width={width}
  >
    {children}
  </Modal>, toggle]

}
