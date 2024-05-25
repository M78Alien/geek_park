import { Button, Card, Form, Input } from 'antd'
import './index.scss'
import logo from '@/assets/logo.png'

const onFinish = (formValue) => {
  console.log(formValue)
}

const Login = () => {
  return (
    <div className='login'>
      <Card className='login-card'>
        <img src={logo} alt='' className='logo'/>
        <Form 
          validateTrigger={['onBlur']}
          onFinish={ onFinish }
        >
          <Form.Item 
            style={{ marginBottom: 30 }}
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号'},
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式不对'
              }
            ]}
          >
            <Input size='large' placeholder='请输入手机号' maxLength={11}></Input>
          </Form.Item>
          <Form.Item 
            style={{ marginBottom: 30 }}
            name="code"
            rules={[
              { required: true, message: '请输入验证码'}
            ]}
          >
            <Input size='large' placeholder='请输入验证码' maxLength={6}></Input>
          </Form.Item>
          <Form.Item style={{ marginBottom: 30 }}>
            <Button 
              type='primary' size='large' htmlType="submit" block
            >登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login