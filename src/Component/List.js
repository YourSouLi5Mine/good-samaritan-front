import React from "react";
import { connect } from "react-redux";
import '../Style/List.css'

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const ConnectedList = ({ posts }) => (
  <ul className="list-group list-group-flush">
    {posts.map(el => (
      <li className="list-group-item" key={el.id}>
        User id: {el.user_id}. Group id: {el.group_id}. Post: {el.contain} Created at: {el.created_at}.
      </li>
    ))}
  </ul>
)

const List = connect(mapStateToProps)(ConnectedList)
export default List
