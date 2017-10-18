import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import { fetchPosts } from '../actions';
import Post from './Post';

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
      <div>
        <ControlBar />
        {posts.map((post) => (
          <Post post={post} key={post.id}/>
        ))}
      </div>
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
