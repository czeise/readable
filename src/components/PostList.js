import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import { fetchPosts } from '../actions';
import Post from './Post';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class PostList extends Component {
  componentDidMount() {
    const { fetchPosts, selectedCategory } = this.props;
    fetchPosts(selectedCategory);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts, selectedCategory } = this.props;
    if (nextProps.selectedCategory !== selectedCategory) {
      fetchPosts(nextProps.selectedCategory);
    }
  }

  render() {
    const { posts } = this.props;
    return(
      <Panel header={<ControlBar />}>
        <ListGroup fill>
          {posts.map((post) => (
            <ListGroupItem key={post.id}><Post post={post}/></ListGroupItem>
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string
};

function mapStateToProps(state) {
  const { posts } = state;
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
