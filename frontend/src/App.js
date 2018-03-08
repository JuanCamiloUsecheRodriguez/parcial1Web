import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  likes(lista) {
    this.setState({ recetas: [] });
    let data = { ingredientes: lista };
    fetch("https://www.instagram.com/duto_guerra/?__a=1")
      .then((resp) => resp.json())
      .then(function (data){
        let datos = data.results;
        return datos.map(function(proob){
          console.log(proob.user.media.nodes[0].likes.count);
        })
      });
  }


  render() {

    console.log("https://www.instagram.com/duto_guerra/?__a=1");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">InstaFight</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
