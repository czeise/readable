import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByVotes, sortByNewest, sortByOldest } from '../actions';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ControlBar extends Component {
  render() {
    const { sortByVotes, sortByNewest, sortByOldest } = this.props;

    return(
      <div>
        <ButtonToolbar>
          <Button bsStyle='link' onClick={() => sortByVotes()}>Top</Button>
          <Button bsStyle='link' onClick={() => sortByNewest()}>New</Button>
          <Button bsStyle='link' onClick={() => sortByOldest()}>Old</Button>

          <LinkContainer to='/new'>
            <Button className='pull-right' bsStyle='link'>Add New Post</Button>
          </LinkContainer>
        </ButtonToolbar>
      </div>
    );
  }
}

ControlBar.propTypes = {
  posts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { posts } = state;
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    sortByVotes: () => dispatch(sortByVotes()),
    sortByNewest: () => dispatch(sortByNewest()),
    sortByOldest: () => dispatch(sortByOldest())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
