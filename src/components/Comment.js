import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonGroup, Button, Glyphicon, FormControl, FormGroup, ButtonToolbar
} from 'react-bootstrap';
import Moment from 'moment';
import Pluralize from 'pluralize';
import { postVote, editPost } from '../actions';
import { LinkContainer } from 'react-router-bootstrap';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  // state = {
  //   editEnabled: false,
  //   value: this.props.post.body
  // }

  handleVote(vote) {
    const { postVote, post } = this.props;
    postVote(post.id, vote);
  }

  handleChange(event) {
    this.setState({ body: event.target.value });
  }

  handleEdit() {
    const { editPost, post } = this.props;
    const { body } = this.state;
    editPost(post.id, post.title, body);
    this.setState({ editMode: false });
  }

  enableEdit = () => {
    this.setState({ editMode: true });
  }

  disableEdit = () => {
    const { body } = this.props.post;
    this.setState({
      editMode: false,
      body: body
     });
  }

  render() {
    const { comment } = this.props;
    return(
      <Row>
        <Col xs={3} sm={2} md={1}>
          <ButtonGroup vertical block bsSize='small'>
            <Button><Glyphicon glyph='arrow-up' /></Button>
            <Button><Glyphicon glyph='arrow-down' /></Button>
          </ButtonGroup>
        </Col>
        <Col xs={6} sm={7} md={8}>
          <p>{comment.author} {Pluralize('points', comment.voteScore, true)} {Moment(comment.timestamp).fromNow()}</p>
          <p>{comment.body}</p>

          <ButtonToolbar>
            <Button bsStyle='link' onClick={this.enableEdit}>edit</Button>
            <Button bsStyle='link'>delete</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

Comment.propTypes = {
  post: PropTypes.object.isRequired,
  detail: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    postVote: (id, vote) => dispatch(postVote(id, vote)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
