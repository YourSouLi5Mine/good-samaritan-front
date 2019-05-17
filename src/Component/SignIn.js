import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography, notification, Row, Col } from 'antd'
import '../Style/SignIn.css'
import axios from 'axios'
import moment from 'moment'

const { Title } = Typography

const redirection = () => {
  window.location = '/feed'
}

class SignIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((user) => {
        axios.post('http://localhost:8000/api/v1/signin', {
          email: user.email,
          password: user.password
        })
        .then((res) => {
          let cookieDate = moment().add(12, 'h').toDate().toString().substring(0, 33)
          document.cookie = `token=${res.data.token}; expires=${cookieDate}`
          notification['success']({
            message: 'Success',
            description: 'Correct login',
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
        </Col>
      </Row>
    )
  }
}

const WrappedSignin= Form.create()(SignIn)

export default WrappedSignin
