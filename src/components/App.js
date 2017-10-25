import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import PostList from './PostList';

class App extends Component {
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
        </Switch>
      </Grid>
    );
  }
}

export default App;
