import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonGroup, Button, Glyphicon, FormControl, FormGroup, ButtonToolbar
} from 'react-bootstrap';
import Moment from 'moment';
import Pluralize from 'pluralize';
import { commentVote, editComment } from '../actions';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      body: props.comment.body
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleVote(vote) {
    const { commentVote, comment } = this.props;
    commentVote(comment.id, vote);
  }

  handleChange(event) {
    this.setState({ body: event.target.value });
  }

  handleEdit() {
    const { editComment, comment } = this.props;
    const { body } = this.state;
    editComment(comment.id, body);
    this.setState({ editMode: false });
  }

  enableEdit = () => {
    this.setState({ editMode: true });
  }

  disableEdit = () => {
    const { body } = this.props.comment;
    this.setState({
      editMode: false,
      body: body
     });
  }

  render() {
    const { comment } = this.props;
    const { editMode, body } = this.state;
    return(
      <Row>
        <Col xs={3} sm={2} md={1}>
          <ButtonGroup vertical block bsSize='small'>
            {/* TODO: Handle comment votes */}
            <Button onClick={() => this.handleVote('upVote')}><Glyphicon glyph='arrow-up' /></Button>
            <Button onClick={() => this.handleVote('downVote')}><Glyphicon glyph='arrow-down' /></Button>
          </ButtonGroup>
        </Col>
        <Col xs={6} sm={7} md={8}>
          <p>{comment.author} {Pluralize('points', comment.voteScore, true)} {Moment(comment.timestamp).fromNow()}</p>
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
  comment: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    commentVote: (id, vote) => dispatch(commentVote(id, vote)),
    editComment: (id, body) => dispatch(editComment(id, body))
  };
}

export default connect(null, mapDispatchToProps)(Comment);
