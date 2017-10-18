import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ControlBar extends Component {
  render() {
    return(
      <div>
        ControlBar
      </div>
    );
  }
}

ControlBar.propTypes = {
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
