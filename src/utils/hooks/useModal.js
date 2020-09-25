import {Modal} from "antd";
import React, {useState} from "react";
import {useToggle} from "react-use";

export default function (title, width = 500) {

  const [initialValue, setInitialValue] = useState(initialValue)

  const [on, toggleOn] = useToggle(false)

  function toggle(init = {}) {
    setInitialValue(init)
    toggleOn(!on)
  }

  return [({children}) => <Modal
    destroyOnClose
    title={title}
    visible={on}
    onCancel={() => toggle(false)}
    footer={null}
    width={width}
  >
    {children}
  </Modal>, toggle]

}
