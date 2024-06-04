import { Button, Card, Form, Input, Radio, Select, Space, Upload, message } from "antd"
import './index.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from "react"
import { createArticleAPI, editArticleAPI, getArticleDetailAPI, getChannelAPI } from "@/apis/article"
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from "react-router-dom"

const { Option } = Select

const Publish = () => {
  const [ channelList, setChannelList ] = useState([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
    const getArticleDetail = async () => {
      const res = await getArticleDetailAPI(articleId)
      const { cover, ...formValue} = res.data
      form.setFieldsValue({...formValue, type: cover.type})
      setImageType(cover.type)
      setImageList(cover.images.map(url => ({ url })))
    }
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form])

  const onFinish = async (formValue) => {
    // console.log(formValue);
    if(imageType !== imageList.length) return message.warning('图片数量与选择不一致')
    const { channel_id, content, title } = formValue
    const formatUrl = (list) => {
      return list.map(item => {
        if(item.response) {
          return item.response.data.url
        } else {
          return item.url
        }
      })
    }
    const params = {
      channel_id: channel_id,
      content,
      title,
      cover: {
        type: imageType,
        images: formatUrl(imageList)
      }
    }
    if (articleId) {
      const res = await editArticleAPI(articleId, params)
      message.success(res.message)
    } else {
      const res = await createArticleAPI(params)
      message.success(res.message)
    }
    navigate('/article')
  }

  const cacheImageList = useRef([])
  const [imageList, setImageList] = useState([])
  const onUpload = (value) => {
    setImageList(value.fileList)
    cacheImageList.current = value.fileList
  }

  const [imageType, setImageType] = useState(1)
  const onTypeChange = (value) => {
    setImageType(value.target.value)
    if(value.target.value === 1) {
      const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
      setImageList(imgList)
    } else if (value.target.value === 3) {
      setImageList(cacheImageList.current)
    }
  } 

  return (
    <div className="publish">
      <Card title={articleId ? '编辑文章' : '创建文章'}>
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
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
            name="channel_id"
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
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
            <Upload 
              listType="picture-card" 
              showUploadList
              name="image"
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUpload}
              maxCount={imageType}
              multiple={imageType > 1}
              fileList={imageList}
            >
              <div>
                <PlusOutlined></PlusOutlined>
              </div>
            </Upload>}
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
                {articleId ? '更新文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish