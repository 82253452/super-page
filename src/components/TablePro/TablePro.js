import {Request} from "@/utils/utils";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import React, {useRef} from "react";


export default React.forwardRef(({title, url, formRef, columns, toolBarRender, children}, ref) => {

  async function queryData(params, sorter, filter) {
    return Request(url, {...params, status: 0}).then(res => ({
      data: res.list || res,
      success: true,
      total: res.total
    }))
  }

  return <PageContainer>
    <ProTable
      actionRef={ref}
      headerTitle={title}
      request={queryData}
      columns={columns}
      toolBarRender={toolBarRender}
    />
    {children}
  </PageContainer>
})
