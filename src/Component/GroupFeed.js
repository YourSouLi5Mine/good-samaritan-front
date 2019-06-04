import React, { Component } from 'react';
import { Row, Col } from 'antd'
import PostForm from './PostForm' 
import List from "./List";

import '../Style/GroupFeed.css';


class GroupFeed extends Component {
  render() {
    return (
      <Row>
        <Col xs={{span:20, offset: 2}} md={{span: 4, offset: 10}}>
          <h2>Group Feed</h2>
          <PostForm groupId={this.props.match.params.id}></PostForm>
          <List></List>
        </Col>
      </Row>
    );
  }
}
export default GroupFeed;
