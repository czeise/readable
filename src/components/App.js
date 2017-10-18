import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import {Route} from 'react-router-dom';
import Header from './Header';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <Grid>
        <Route exact path='/' render={() => (
          <div>
            <Header selectedCategory=''/>
            <PostList />
          </div>
        )}/>
        <Route path='/:category' render={({ match }) => (
          <div>
            {/* This will always render the header, even if the category doesn't exist */}
            <Header selectedCategory={match.params.category}/>
            {/* TODO: For other component(s), only display if category exists... */}
            <PostList selectedCategory={match.params.category}/>
          </div>
        )}/>
      </Grid>
    );
  }
}

export default App;
