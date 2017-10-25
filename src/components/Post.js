import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    const { post } = this.props;
    return(
      <div>
        Post with {post.voteScore} votes from {post.timestamp}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
