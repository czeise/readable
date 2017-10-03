import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    const { categories, selectedCategory } = this.props;
    return(
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <IndexLinkContainer to='/'><Navbar.Brand>Home</Navbar.Brand></IndexLinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {categories.map((category) => (
                <LinkContainer to={`/${category.name}`} key={category.name}>
                  <NavItem>{category.name}</NavItem>
                </LinkContainer>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <PageHeader>Readable <small>{selectedCategory}</small></PageHeader>
      </div>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired
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
