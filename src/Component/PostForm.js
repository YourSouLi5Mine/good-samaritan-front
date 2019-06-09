import React, { Component } from "react"
import { Form, Icon, Input, Button, notification } from 'antd'
import { connect } from "react-redux";
import { addPost } from "../Redux/Actions/index";
import '../Style/Post.css'
import axios from 'axios'
import Pusher from 'pusher-js'

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post))
  };
}

class PostForm extends Component {
  componentDidMount() {
    const { addPost } = this.props
    Pusher.logToConsole = true;

    const pusher = new Pusher('28007b6ee133135e5fdf', {
      cluster: 'us3',
      forceTLS: true
    })

    const channel = pusher.subscribe(`group.${this.props.groupId}`)
    channel.bind('group_event', function(data) {
      addPost(data.post)
    })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.validateFields()
      .then((post) => {
        axios.post(`http://localhost:8000/api/v1/groups/${this.props.groupId}/posts?${document.cookie}`, {
          contain: post.contain
        })
        .then((res) => {
          notification['success']({
            message: 'Success',
            description: 'The post was created!'
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

const WrappedPost = connect(null, mapDispatchToProps)(Form.create()(PostForm))

export default WrappedPost
