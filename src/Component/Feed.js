import React, { Component } from "react"
import { Button } from 'antd'
import '../Style/Feed.css'
import GroupModal from './GroupModal'
import axios from 'axios'

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

        axios.post('http://localhost:8000/api/v1/groups', {
          name: group.name,
        })
        .then((res) => {
          console.log(res.data)
          if (Object.keys(res.data).length !== 0 && res.data.constructor === Object) {
            console.log(res.data)
            //window.location = "/group/{res.data.id}"
          } else {
            //window.location = "/signin"
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

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        <Button type="primary" size="large" block onClick={this.showModal}>Create Group</Button>
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
