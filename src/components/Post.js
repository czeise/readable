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

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      body: props.post.body
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
    const { post, detail } = this.props;
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
          <p>submitted {Moment(post.timestamp).fromNow()} by {post.author}</p>
          {detail && (
            <form>
              <FormGroup>
                <FormControl
                  componentClass='textarea'
                  value={this.state.body}
                  disabled={!this.state.editMode}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ButtonToolbar hidden={!this.state.editMode}>
                <Button onClick={this.handleEdit}>save</Button>
                <Button onClick={this.disableEdit}>cancel</Button>
              </ButtonToolbar>
            </form>
          )}
          <ButtonToolbar>
            <LinkContainer to={`/${post.category}/${post.id}`}>
              <Button bsStyle='link'>{Pluralize('comment', post.commentCount, true)}</Button>
            </LinkContainer>
            {detail ? (
              <Button bsStyle='link' onClick={this.enableEdit}>edit</Button>
            ) : (
              <LinkContainer to={`/${post.category}/${post.id}`}>
                <Button bsStyle='link'>edit</Button>
              </LinkContainer>
            )}
            <Button bsStyle='link'>delete</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

Post.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
