import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonGroup, Button, Glyphicon, FormControl, FormGroup, ButtonToolbar, Panel, ListGroup, ListGroupItem
} from 'react-bootstrap';
import Moment from 'moment';
import Pluralize from 'pluralize';
import { postVote, editPost, fetchComments, newComment, deletePost } from '../actions';
import { LinkContainer } from 'react-router-bootstrap';
import Comment from './Comment';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      body: '',
      commentBody: '',
      commentAuthor: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentAuthorChange = this.handleCommentAuthorChange.bind(this);
    this.handleSaveComment = this.handleSaveComment.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  componentDidMount() {
    const { fetchComments, id } = this.props;

    fetchComments(id);
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps;
    if (post) {
      this.setState({ body: post.body });
    }
  }

  postLoaded() {
    const { post } = this.props;

    this.setState({ body: post.body });
    return true;
  }

  handleVote(vote) {
    const { postVote, post } = this.props;
    postVote(post.id, vote);
  }

  handleChange(event) {
    this.setState({ body: event.target.value });
  }

  handleCommentAuthorChange(event) {
    this.setState({ commentAuthor: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ commentBody: event.target.value });
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

  handleSaveComment() {
    const { newComment, post } = this.props;
    const { commentAuthor, commentBody, commentCount } = this.state;

    newComment(commentBody, commentAuthor, post.id);
    this.setState({ commentAuthor: '', commentBody: '', commentCount: commentCount + 1 });
  }

  handleDeletePost() {
    const { deletePost, post } = this.props;

    deletePost(post.id);
  }

  render() {
    const { post, detail, comments } = this.props;
    const { body, editMode, commentAuthor, commentBody } = this.state;
    return(
      <div>
        {post &&
          <Row>
            <Col xs={3} sm={2} md={1}>
              <ButtonGroup vertical block bsSize='small'>
                <Button onClick={() => this.handleVote('upVote')}><Glyphicon glyph='arrow-up' /></Button>
                <Button bsStyle='link' disabled>{post.voteScore}</Button>
                <Button onClick={() => this.handleVote('downVote')}><Glyphicon glyph='arrow-down' /></Button>
              </ButtonGroup>
            </Col>
            <Col xs={9} sm={10} md={11}>
              {detail ? (
                <h4>{post.title}</h4>
              ) : (
                <LinkContainer to={`/${post.category}/${post.id}`}>
                  <a><h4>{post.title}</h4></a>
                </LinkContainer>
              )}
              <p>submitted {Moment(post.timestamp).fromNow()} by {post.author}</p>
              {detail && (
                <form>
                  <FormGroup>
                    <FormControl
                      componentClass='textarea'
                      value={body}
                      disabled={!editMode}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <ButtonToolbar hidden={!editMode}>
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
                <Button bsStyle='link' onClick={() => this.handleDeletePost()}>delete</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        }
        {post && detail &&
          <div>
            <hr/>
            <Row>
              <Col xs={9} xsOffset={3} sm={10} smOffset={2} md={11} mdOffset={1}>
                <Panel header={`all ${Pluralize('comments', post.commentCount, true)}`}>
                  <ListGroup fill>
                    <ListGroupItem>
                      <form>
                        <FormGroup>
                          <FormControl
                            type='text'
                            placeholder='username'
                            value={commentAuthor}
                            onChange={this.handleCommentAuthorChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormControl
                            componentClass='textarea'
                            value={commentBody}
                            onChange={this.handleCommentChange}
                            placeholder='comment'
                          />
                        </FormGroup>
                        <ButtonToolbar>
                          <Button onClick={this.handleSaveComment}>save</Button>
                        </ButtonToolbar>
                      </form>
                    </ListGroupItem>
                    {comments[post.id] && comments[post.id].map((comment) => (
                      <ListGroupItem key={comment.id}>
                        <Comment comment={comment} />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Panel>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  detail: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const { posts, comments } = state;

  const post = posts.find(post => post.id === ownProps.id);

  return { post, comments };
}

function mapDispatchToProps(dispatch) {
  return {
    postVote: (id, vote) => dispatch(postVote(id, vote)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    fetchComments: (id) => dispatch(fetchComments(id)),
    newComment: (body, author, parentId) => dispatch(newComment(body, author, parentId)),
    deletePost: (id) => dispatch(deletePost(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
