import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography, notification } from 'antd'
import '../Style/EditUser.css'
import axios from 'axios'

const { Title } = Typography

const redirection = () => {
  window.location = '/feed'
}

class EditUser extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((user) => {
        axios.put(`http://localhost:8000/api/v1/users?${document.cookie}`, {
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then((res) => {
          notification['success']({
            message: 'Success',
            description: 'The user was updated!',
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

  getUser() {
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

  setInitialValues = () => {
    const { form } = this.props;
    axios.get(`http://localhost:8000/api/v1/users/edit?${document.cookie}`)
    .then((res) => {
      var res_email = res.data.user.email
      var res_username = res.data.user.username
      form.setFieldsValue({
        email: res_email,
        username: res_username
      });
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
  };

  componentDidMount() {
    this.setInitialValues()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Title>Edit </Title>
        <Form onSubmit={this.handleSubmit} className="edit-user-form">
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

const WrappedEditUser = Form.create()(EditUser)

export default WrappedEditUser
