import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography } from 'antd'
import '../Style/SignIn.css'
import axios from 'axios'

const { Title } = Typography

class SignIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((user) => {
        axios.post('http://localhost:8000/api/v1/login', {
          email: user.email,
          password: user.password
        })
        .then((res) => {
          if (Object.keys(res.data).length !== 0 && res.data.constructor === Object) {
            window.location = "/"
          } else {
            window.location = "/signin"
          }
        })
        .catch(err => {
          console.log('Error')
        })
      })
  }

  validateFields() {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (err) {
          reject(err)
        }
        resolve(values)
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Title>Sign In</Title>
        <Form onSubmit={this.handleSubmit} className="signin-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input an email'}],
              })(
            <Input prefix={<Icon className="icon" type="mail" />} placeholder="Email" />
              )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" prefix={<Icon className="icon" type="lock" />} placeholder="Password" />
            )}
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

const WrappedSignin= Form.create()(SignIn)

export default WrappedSignin
