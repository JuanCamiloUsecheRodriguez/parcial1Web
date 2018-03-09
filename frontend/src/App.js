import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormularioPeleadores from "./components/FormularioPeleadores.js"

class App extends Component {

  constructor (){
    super();
    this.state = {
      peleador1: null,
      peleador2: null,
      total1: null,
      total2: null,
      ganador: null
    };

    this.obtenerDatos = this.obtenerDatos.bind(this);
    this.peleadores = this.peleadores.bind(this);
  }

  componentWillUpdate() {
    if (this.state.peleador1 !== null && this.state.peleador2 !== null && 
      this.state.total1 === null && this.state.total2 === null){
      this.obtenerDatos(this.state.peleador1, (t) => {
        this.obtenerDatos(this.state.peleador2, (t2) => {
          this.setState({total1: t, total2: t2});
        });
      });
    }
    else if (this.state.total1 !== null && this.state.total2 !== null && this.state.ganador === null){
      let res = null;
      if (this.state.total1 >= this.state.total2){
        res = this.state.peleador1;
      } else {
        res = this.state.peleador2;
      }

      this.setState({peleador1: null, peleador2: null, ganador: res});
    }
  }




  obtenerDatos(peleador ,c){

    fetch("https://www.instagram.com/" +peleador+"/?__a=1")
      .then((res) =>{
        if (res.ok)
          return res.json();
      })
      .then ((r) => {
        let total = 0;
        r.user.media.nodes.forEach((d) => {          
          let contador = d.likes.count;
          total = total + contador;
        });
        c(total);
      })
      .catch ((err) => console.log("Error :v" + err.message));
  }


  peleadores(p1, p2){
    console.log("inn");
    this.setState({peleador1: p1, peleador2: p2});
  }

  render() {
    console.log("render");
    let ganador = null;
    if (this.state.ganador !== null){
      ganador=(<h1>
       {this.state.ganador} </h1>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> InstaFight! </h1>
        </header>
        <p className="App-intro">
          Equisde
        </p>

        <div> {ganador} </div>

        <FormularioPeleadores peleadores={this.peleadores.bind(this)}/>
      </div>
    );
  }
}

export default App;
