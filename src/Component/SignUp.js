import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography, notification, Row, Col } from 'antd'
import '../Style/SignUp.css'
import axios from 'axios'

const { Title } = Typography

const redirection = () => {
  window.location = '/signin'
}

class SignUp extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((user) => {
        axios.post('http://localhost:8000/api/v1/signup', {
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then((res) => {
          notification['success']({
            message: 'Success',
            description: 'The user was created!',
            onClose: redirection
          })
        })
        .catch(err => {
          let res  = JSON.parse(err.request.response)
          for (const field in res) {
            notification['error']({
              message: field.charAt(0).toUpperCase() + field.slice(1),
              description: res[field]
            })
          }
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
      <Row>
        <Col xs={{span: 20, offset: 2}} md={{span: 4, offset: 10}}>
          <Title>Sign Up</Title>
          <Form xs={10} md={3} onSubmit={this.handleSubmit} className="signup-form">
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
        </Col>
      </Row>
    )
  }
}

const WrappedSignup = Form.create()(SignUp)

export default WrappedSignup
