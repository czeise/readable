import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import Moment from 'moment';
import Pluralize from 'pluralize';
import { Link } from 'react-router-dom';
import { postVote } from '../actions';

class Post extends Component {
  handleVote(vote) {
    const { postVote, post } = this.props;
    postVote(post.id, vote);
  }

  render() {
    const { post } = this.props;
    return(
      <Row>
        <Col xs={3} sm={2} md={1}>
          <ButtonGroup vertical block bsSize='small'>
            <Button onClick={() => this.handleVote('upVote')}><Glyphicon glyph='arrow-up' /></Button>
            <Button bsStyle='link' disabled>{post.voteScore}</Button>
            <Button onClick={() => this.handleVote('downVote')}><Glyphicon glyph='arrow-down' /></Button>
          </ButtonGroup>
        </Col>
        <Col xs={9} sm={10} md={11}>
          <h4>{post.title}</h4>
          <div>submitted {Moment(post.timestamp).fromNow()} by {post.author}</div>
          <strong>
            <Link to={`/${post.category}/${post.id}`}>{Pluralize('comment', post.commentCount, true)}</Link> <Link to={`/${post.category}/${post.id}`}>edit</Link> delete
          </strong>
        </Col>
      </Row>
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
  return {
    postVote: (id, vote) => dispatch(postVote(id, vote))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
