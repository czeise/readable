import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Radio, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addPost } from '../actions';
import { Redirect } from 'react-router';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      selectedCategory: '',
      submissionComplete: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ selectedCategory: event.target.value });
  }

  handleSave() {
    const { addPost } = this.props;
    const { title, body, author, selectedCategory } = this.state;

    addPost(title, body, author, selectedCategory);
    this.setState( { submissionComplete: true });
  }

  render() {
    const { categories } = this.props;
    const { title, body, author, selectedCategory, submissionComplete } = this.state;

    if (submissionComplete) {
      return(<Redirect to={`/${selectedCategory}`}/>);
    }

    return(
      <form>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type='text'
            value={title}
            onChange={this.handleTitleChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Text</ControlLabel>
          <FormControl
            componentClass='textarea'
            value={body}
            onChange={this.handleBodyChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Author</ControlLabel>
          <FormControl
            type='text'
            value={author}
            onChange={this.handleAuthorChange}
          />
        </FormGroup>

        <ControlLabel>Category</ControlLabel>
        <FormGroup>
          {categories.map((category) => (
            <Radio
              name='categories'
              key={category.name}
              value={category.name}
              inline
              checked={selectedCategory === category.name}
              onChange={this.handleCategoryChange}
            >
              {category.name}
            </Radio>
          ))}
        </FormGroup>

        <Button onClick={this.handleSave}>Submit</Button>
      </form>
    );
  }
}

NewPost.propTypes = {
  categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { categories } = state;
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (title, body, author, category) => dispatch(addPost(title, body, author, category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
