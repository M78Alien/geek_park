import { Button, Card, Form, Input, Select, Space, message } from "antd"
import './index.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react"
import { createArticleAPI, getChannelAPI } from "@/apis/article"

const { Option } = Select

const Publish = () => {
  const [ channelList, setChannelList ] = useState([])

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  const onFinish = async (formValue) => {
    console.log(formValue);
    const { channelId, content, title } = formValue
    const params = {
      channelId,
      content,
      title,
      cover: {
        type: 0,
        image: []
      }
    }
    const res = await createArticleAPI(params)
    message.success(res.message)
  }

  return (
    <div className="publish">
      <Card title='创建文章'>
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 500 }}></Input>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channelId"
            rules={[{ required: true, message: '请输入文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 500 }}>
              { channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish