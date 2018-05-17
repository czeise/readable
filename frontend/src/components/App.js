import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import PostList from './PostList';
import Post from './Post';
import NewPost from './NewPost';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class App extends Component {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    return (
      <Grid>
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <Header selectedCategory=''/>
              <PostList />
            </div>
          )}/>

          <Route exact path='/new' render={() => (
            <div>
              <Header selectedCategory='new'/>
              <NewPost />
            </div>
          )}/>

          {/* Always renders, even if the category doesn't exist, that's OK */}
          <Route exact path='/:category' render={({ match }) => (
            <div>
              <Header selectedCategory={match.params.category}/>
              <PostList selectedCategory={match.params.category}/>
            </div>
          )}/>

          <Route exact path='/:category/:id' render={({ match }) => (
            <div>
              <Header selectedCategory={match.params.category}/>
              <Post id={match.params.id} detail={true}/>
            </div>
          )}/>
        </Switch>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state;

  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
