import React, { Component } from 'react';
import Header from './Header';
import { Grid } from 'react-bootstrap';
import {Route} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Grid>
        <Route exact path='/' render={() => (
          <Header selectedCategory=''/>
        )}/>
        <Route path='/:category' render={({ match }) => (
          // This isn't really what I want to do here, but it's OK for now
          // This will always render the page...I'd prefer to only allow pages that match a category
          <Header selectedCategory={match.params.category}/>
        )}/>
      </Grid>
    );
  }
}

export default App;
