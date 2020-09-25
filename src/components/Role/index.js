import {SYSUSER_ROLES} from "@/services/apis";
import {Request} from "@/utils/utils";
import {Select} from "antd";
import React from "react";
import {useQuery} from "react-query";

export default function ({value, onChange}) {

  const {data = []} = useQuery(SYSUSER_ROLES, () => Request(SYSUSER_ROLES))

  function handleChange(e) {
    onChange && onChange(e)
  }


  return <Select
    mode="multiple"
    style={{width: '100%'}}
    placeholder="选择角色"
    onChange={handleChange}
    optionLabelProp="label"
    value={value}
  >
    {data.map(d => <Select.Option key={d.id} value={d.id} label={d.remark}>
      <div>{d.remark}</div>
    </Select.Option>)}
  </Select>
}
