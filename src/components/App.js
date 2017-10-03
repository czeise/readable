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
          // This will always render the header, even if the category doesn't exist
          <Header selectedCategory={match.params.category}/>
          // TODO: For other component(s), only display if category exists...
        )}/>
      </Grid>
    );
  }
}

export default App;
