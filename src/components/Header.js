import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class Header extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return(
      <div>
        <Navbar inverse>
          <Nav>
            <NavItem>Home</NavItem>
            {categories.map((category) => (
              <NavItem>{category.name}</NavItem>
            ))}
          </Nav>
        </Navbar>
        {/* TODO: use route to populate or create a 'selectedCategory' item in state */}
        <PageHeader>Readable <small>react</small></PageHeader>
      </div>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { categories } = state;
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
