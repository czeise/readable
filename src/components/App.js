import React, { Component } from 'react';
import Header from './Header';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Header selectedCategory='none'/>
      </Grid>
    );
  }
}

export default App;
