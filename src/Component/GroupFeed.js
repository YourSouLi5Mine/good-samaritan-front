import React, { Component } from 'react';
import { Row, Col } from 'antd'
import PostForm from './PostForm' 

import '../Style/GroupFeed.css';


class GroupFeed extends Component {
  render() {
    return (
      <Row>
        <Col xs={{span:20, offset: 2}} md={{span: 4, offset: 10}}>
          <PostForm></PostForm>
        </Col>
      </Row>
    );
  }
}
export default GroupFeed;
