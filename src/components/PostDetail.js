import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPost } from '../actions';

class PostDetail extends Component {
  componentDidMount() {
    const { fetchPost, id } = this.props;
    fetchPost(id);
  }

  render() {
    const { post } = this.props;
    return(
      <div>
        {post && (
          <Post post={post} detail={true}/>
        )}
      </div>
    );
  }
}

PostDetail.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object
};

function mapStateToProps(state, props) {
  const post = state.posts.find(post => post.id === props.id);
  return { post };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
