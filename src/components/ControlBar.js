import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByVotes, sortByNewest, sortByOldest } from '../actions';
import { Button } from 'react-bootstrap';

class ControlBar extends Component {
  render() {
    const { sortByVotes, sortByNewest, sortByOldest } = this.props;

    return(
      <div>
          <Button bsStyle='link' onClick={() => sortByVotes()}>Top</Button>
          <Button bsStyle='link' onClick={() => sortByNewest()}>New</Button>
          <Button bsStyle='link' onClick={() => sortByOldest()}>Old</Button>
        <span className='pull-right'>Add New Post</span>
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
