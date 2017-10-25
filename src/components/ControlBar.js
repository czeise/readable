import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByVotes, sortByNewest, sortByOldest } from '../actions';
import { Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

class ControlBar extends Component {
  render() {
    const { sortByVotes, sortByNewest, sortByOldest } = this.props;

    return(
      <div>
        <Button bsStyle='link' onClick={() => sortByVotes()}>Top</Button>
        <Button bsStyle='link' onClick={() => sortByNewest()}>New</Button>
        <Button bsStyle='link' onClick={() => sortByOldest()}>Old</Button>

        <IndexLinkContainer to='/new'>
          <Button className='pull-right' bsStyle='link'>Add New Post</Button>
        </IndexLinkContainer>
      </div>
    );
  }
}

ControlBar.propTypes = {
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
