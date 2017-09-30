import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, PageHeader } from 'react-bootstrap';

class Header extends Component {
  // const {selectedCategory} = props;

  render() {
    return(
      <div>
        <Navbar inverse>
          <Nav>
            <NavItem>Home</NavItem>
            <NavItem className='active'>React</NavItem>
          </Nav>
        </Navbar>
        <PageHeader>Readable <small>React</small></PageHeader>
      </div>
    );
  }
}

// Header.propTypes = {
//   selectedCategory: PropTypes.string.isRequired
// };

export default Header;
