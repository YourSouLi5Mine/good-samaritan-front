import React, { Component } from "react"
import { Button, notification } from 'antd'
import '../Style/Feed.css'
import GroupModal from './GroupModal'
import axios from 'axios'

const redirectLogin = () => {
  window.location = '/signin'
}

class Feed extends Component {
  state = {
    modalVisible: false,
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = this.formRef.props.form;
    form.validateFields()
      .then((group) => {
        form.resetFields()
        this.hideModal()

        axios.post(`http://localhost:8000/api/v1/groups?${document.cookie}`, {
          name: group.name
        })
        .then((res) => {
          notification['success']({
            message: 'Success',
            description: 'The group was created!',
            duration: 2.5,
            onClose: setTimeout(function redirect() {
              window.location = `/groups/${res.data.group.id}`
            }, 3000)
          })
        })
        .catch(err => {
          let res  = JSON.parse(err.request.response)
          for (const field in res) {
            if (/token/i.test(res[field])) {
              notification['error']({
                message: field.charAt(0).toUpperCase() + field.slice(1),
                description: 'You are not logged in',
                onClose: redirectLogin
              })
            } else {
              notification['error']({
                message: field.charAt(0).toUpperCase() + field.slice(1),
                description: res[field]
              })
            }
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

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  editUser() {
    window.location = 'user/edit';
  }

  render() {
    return (
      <div>
        <Button type="primary" size="large" block onClick={this.showModal}>Create Group</Button>
        <Button type="primary" size="large" block onClick={this.editUser}>Edit User</Button>
        <GroupModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={this.hideModal}
          onCreate={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Feed
