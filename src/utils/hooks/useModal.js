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

    return [({width = 500, title = '', children}) => <Modal
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
