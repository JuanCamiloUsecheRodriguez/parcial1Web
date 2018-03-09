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
      imagen1: null,
      imagen2: null,
      followers1: null,
      followers2: null,
      ganador: null,
      imagenGanador:null,
      followersGanador:null
    };

    this.obtenerLikesUsuario = this.obtenerLikesUsuario.bind(this);
    this.peleadores = this.peleadores.bind(this);
  }

  componentWillUpdate() {
    if (this.state.peleador1 !== null && this.state.peleador2 !== null && 
      this.state.total1 === null && this.state.total2 === null){
      this.obtenerLikesUsuario(this.state.peleador1, (t) => {
        this.obtenerLikesUsuario(this.state.peleador2, (t2) => {
          this.setState({total1: t, total2: t2, ganador: null});
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

      this.setState({peleador1: null, peleador2: null, total1: null, total2: null, ganador: res});
    }
  }

  obtenerLikesUsuario(peleador ,c){

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
      .catch ((err) => console.log("Error :v " + err.message));
  }


  peleadores(p1, p2){
    this.setState({peleador1: p1, peleador2: p2});
  }

  render() {

    console.log("render");
    let ganador = null;
    if (this.state.ganador !== null){
      ganador=(<h1> El ganador es:
       @{this.state.ganador} </h1>
       );
    }

    let pelea = null;

    if (this.state.peleador1 !== null && this.state.peleador2 !== null){
      pelea = (<h1> Pelea entre @{this.state.peleador1} y @{this.state.peleador2} </h1>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> InstaFight! </h1>
        </header>      
        <br/> 

        <FormularioPeleadores peleadores={this.peleadores.bind(this)}/>
        <br/>

        <div> {pelea} </div>

        <div> {ganador} </div>
      </div>
    );
  }
}

export default App;
