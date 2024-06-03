import { getChannelAPI } from "@/apis/article"
import { Card, Form, Select, DatePicker, Button, Table, Tag, Space } from "antd"
import { useEffect, useState } from "react"
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const {Option} = Select
const {RangePicker} = DatePicker

const Article = () => {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

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
      render: () => {
        return (
          <Space size="middle">
            <Button type="primary" shape="round" icon={<EditOutlined/>} />
            <Button type="primary" danger shape="round" icon={<DeleteOutlined/>} />
          </Space>
        )
      }
    }
  ]

  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]
  return (
    <div>
      <Card title='文章管理'>
        <Form labelCol={{ span: 1 }}>
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
            <Button type="primary" htmlType="submit" style={{ marginLeft: 20}}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选结果查询到 count 条`} style={{ marginTop: 20 }}>
        <Table rowKey="id" columns={columns} dataSource={data}></Table>
      </Card>
    </div>
  )
}

export default Article