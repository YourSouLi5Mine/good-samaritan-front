import React, { Component } from "react"
import { Form, Icon, Input, Button } from 'antd'
import '../Style/Post.css'
import axios from 'axios'

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((post) => {
        console.log(post.contain)
        axios.post('http://localhost:8000/api/v1/posts', {
          contain: post.contain
        })
        .then((res) => {
          console.log(res.data)
          console.log(res)
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
        <Form onSubmit={this.handleSubmit} className="post-form">
          <Form.Item>
            {getFieldDecorator('contain', {
              rules: [{required: true, message: 'Please input a post'}],
              })(
            <Input prefix={<Icon className="icon" type="form" />} placeholder="Have you seen anything strange in the neighborhood?" />
              )}
          </Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

const WrappePost = Form.create()(PostForm)

export default WrappePost
