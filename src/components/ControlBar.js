import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByNewest } from '../actions';

class ControlBar extends Component {
  render() {
    const { sortByNewest } = this.props;

    return(
      <div>
        <span>
          <a>Top</a> | <button onClick={() => sortByNewest()}>New</button> | Old</span>
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
    sortByNewest: () => dispatch(sortByNewest())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
