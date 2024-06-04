import {  deleteArticleAPI, getArticleListAPI, getChannelAPI } from "@/apis/article"
import { Card, Form, Select, DatePicker, Button, Table, Tag, Space, Popconfirm } from "antd"
import { useEffect, useState } from "react"
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const {Option} = Select
const {RangePicker} = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const [channelList, setChannelList] = useState([])
  const [params, setParams] = useState({
    status: null,
    channel_id: null,
    begin_pubdate: null,
    end_pubdate: null,
    page: 1,
    per_page: 4
  })
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0
  })

  const getArticleList = async (params) => {
    const res = await getArticleListAPI(params)
    const { results, total_count } = res.data
    setArticleList({
      list: results,
      count: total_count
    })
  }

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
    getArticleList(params)
  }, [params])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 160,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={80} style={{ marginLeft: 20 }} alt=""></img>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 250
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读量',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="round" icon={<EditOutlined/>} onClick={
              () => navigate(`/publish?id=${data.id}`)
            } />
            <Popconfirm
              title="警告"
              description="确定要删除这篇文章吗？"
              onConfirm={() => deleteArticle(data)}
              okText="确认"
              cancelText="取消"
              placement="topRight"
            >
              <Button type="primary" danger shape="round" icon={<DeleteOutlined/>} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const onFinish = (formValue) => {
    const { channel_id, data } = formValue
    setParams({
      status: null,
      channel_id: channel_id,
      begin_pubdate: data[0].format('YYYY-MM-DD'),
      end_pubdate: data[1].format('YYYY-MM-DD'),
      page: 1,
      per_page: 4
    })
  }

  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }

  const deleteArticle = async (data) => {
    await deleteArticleAPI(data.id)
    setParams({
      page: 1,
      per_page: 4
    })
  }

  return (
    <div>
      <Card title='文章管理' style={{height: 250 }}>
        <Form labelCol={{ span: 1 }} onFinish={onFinish}>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 300 }}
            >
              { channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="data">
            <RangePicker locale={locale} style={{ width: 300 }}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginTop: 10 }}>
        <Table rowKey="id" columns={columns} dataSource={articleList.list} size="middle" pagination={{
          current: params.page,
          pageSize: params.per_page,
          onChange: pageChange,
          total: articleList.count
        }}></Table>
      </Card>
    </div>
  )
}

export default Article