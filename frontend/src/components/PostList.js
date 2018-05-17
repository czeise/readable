import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import Post from './Post';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class PostList extends Component {
  render() {
    const { filteredPosts } = this.props;
    return(
      <Panel header={<ControlBar />}>
        <ListGroup fill>
          {filteredPosts.map((post) => (
            <ListGroupItem key={post.id}>
              <Post id={post.id} detail={false}/>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

PostList.propTypes = {
  selectedCategory: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  const { posts } = state;
  const { selectedCategory } = ownProps;

  let filteredPosts = [];

  if (selectedCategory) {
    filteredPosts = posts.filter(post => post.category === selectedCategory);
  } else {
    filteredPosts = posts;
  }

  return { filteredPosts };
}

export default connect(mapStateToProps, null)(PostList);
