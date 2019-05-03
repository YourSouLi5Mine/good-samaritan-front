import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography } from 'antd'
import '../Style/SignUp.css'
import axios from 'axios'

const { Title } = Typography

class SignUp extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((user) => {
        axios.post('http://localhost:8000/api/v1/users', {
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then((res) => {
          console.log(res)
          //const user = data.user
          //if (!user.profile_image) user.profile_image = profileImage
          //if (!user.cover_image) user.cover_image = coverImage
          //
          //this.setState({
          //user
          //})
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
        <Title>Sign Up</Title>
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input an email'}],
              })(
            <Input prefix={<Icon className="icon" type="mail" />} placeholder="Email" />
              )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input an username' }],
            })(
              <Input prefix={<Icon className="icon" type="user" />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" prefix={<Icon className="icon" type="lock" />} placeholder="Password" />
            )}
          </Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

const WrappedSignup = Form.create()(SignUp)

export default WrappedSignup
