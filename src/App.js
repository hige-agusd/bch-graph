import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Chart from './components/Chart';

class App extends Component {
  render() {
    return (
      <Layout>
        <Chart />
      </Layout>
    );
  }
}

export default App;
