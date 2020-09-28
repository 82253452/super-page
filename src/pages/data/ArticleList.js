import {COMMON_ALL, COMMON_DEL, COMMON_PAGE, COMMON_UPDATE} from "@/services/apis";
import useModal from "@/utils/hooks/useModal";
import {Request} from "@/utils/utils";
import {FormOutlined, VideoCameraOutlined,} from '@ant-design/icons';
import {Card, List, Switch} from "antd";
import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {useInfiniteQuery, useMutation, useQuery, useQueryCache} from "react-query";

export default function () {

  const SPACE = 'article'

  const cache = useQueryCache()

  const [temp, setTemp] = useState({})

  const {data: valueEnum = {}} = useQuery('columns', () => Request(COMMON_ALL('column'), {}).then(res => res.reduce((acc, current) => ((acc[current.code] = current.title) && acc), {})))

  const {data = [], fetchMore, canFetchMore} = useInfiniteQuery(COMMON_PAGE(SPACE), (key, page = 1) => Request(COMMON_PAGE(SPACE), {page}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })

  const [mutatePostTodo] = useMutation(
    ({i, j, row}) => Request(COMMON_UPDATE(SPACE), row),
    {
      onMutate: ({i, j, row}) => {
        const previousValue = cache.getQueryData(COMMON_PAGE(SPACE))
        previousValue[i][j] = {...row}
        return previousValue
      },
    }
  )


  async function handleOnChange(i, j, row) {
    row.isTop = row.isTop === 0 ? 1 : 0
    // await Request(COMMON_UPDATE(SPACE), row)
    await mutatePostTodo({i, j, row})
  }

  function showModal(row) {
    setTemp(row)
    toggle()
  }


  const [Modal, toggle] = useModal()


  return <InfiniteScroll
    initialLoad={false}
    pageStart={1}
    loadMore={fetchMore}
    hasMore={canFetchMore}
    useWindow={true}
  ><List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 4,
      xxl: 4,
    }}
    dataSource={data}
    loadMore={fetchMore}
    renderItem={(item, i) => item.list.map((r, j) => (
      <List.Item>
        <Card title={valueEnum[r.columnId]}
              onClick={() => showModal(r)}
              extra={<Switch checked={r.isTop === 1} onChange={() => handleOnChange(i, j, r)}/>}
              cover={<img width={300} height={300} src={r.thumbnail}/>}
        >
          <Card.Meta style={{height: '80px'}} avatar={r.type === 0 ? <VideoCameraOutlined/> : <FormOutlined/>}
                     title={r.title}
                     description={r.summary.length > 40 ? `${r.summary.substring(0, 40)}...` : r.summary}/>
        </Card>
      </List.Item>
    ))}
  />
    <Modal width={1000}>
      {temp.type === 0 ? <iframe
          src={temp.content} frameBorder="0" name="showHere" scrolling="auto" width='100%' height="600px"/>
        : <div dangerouslySetInnerHTML={{__html: temp.content}}/>}
    </Modal>
  </InfiniteScroll>
}
