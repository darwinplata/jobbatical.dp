import React, { Component } from 'react';
import SkillsPage from './components/SkillsPage'; //Skills page component
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="container">
        <SkillsPage />
      </section>
    );
  }
}

export default App;
