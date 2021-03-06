import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormularioPeleadores from "./components/FormularioPeleadores.js";
import Historial from "./components/Historial.js";

class App extends Component {

  constructor (){
    super();
    this.state = {
      peleador1: null,
      peleador2: null,
      total1: null,
      total2: null,
      ganador: null,
      imagenGanador:null,
      followersGanador: null,
      error: false,
      historial: []
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
        this.obtenerDatosGanador(this.state.peleador1);
      } else {
        res = this.state.peleador2;
        this.obtenerDatosGanador(this.state.peleador2);
      }

      this.setState({peleador1: null, peleador2: null, total1: null, total2: null, ganador: res});
    }
  }

  obtenerLikesUsuario(peleador ,c){

    if (this.state.error === false){
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
      .catch ((err) => {
        this.setState({error: true});
        console.log(err.message);
      });
    }
  }

  obtenerDatosGanador(peleador){

    fetch("https://www.instagram.com/" +peleador+"/?__a=1")
      .then((res) =>{
        if (res.ok)
          return res.json();
      })
      .then ((r) => {
        this.setState({imagenGanador: r.user.profile_pic_url_hd, followersGanador: r.user.followed_by.count})
       
      })
      .catch ((err) => {
        this.setState({error: true});
        console.log(err.message);
      });
  }


  peleadores(p1, p2){
    this.setState({peleador1: p1, peleador2: p2, error: false, ganador: null});
  }

  render() {

    let ganador = null;
    let follows = null;
    let img = null;
    let error = null;
    let link = "https://www.instagram.com/"+this.state.ganador;
    console.log(link);
    if (this.state.ganador !== null){
      ganador=(<h1> El ganador es:
       @{this.state.ganador} </h1>      
       );
       follows = (<h1> Followers: {this.state.followersGanador} </h1>);
       img = (<a href = {link}>
       <img src={this.state.imagenGanador} alt="ElGanador"/></a>);
    }

    let pelea = null;

    if (this.state.peleador1 !== null && this.state.peleador2 !== null){
      pelea = (<h1> Pelea entre @{this.state.peleador1} y @{this.state.peleador2} </h1>);
    }

    if (this.state.error === true){
      error = (<h2> ERROR: Los datos deben contener usuarios válidos y sin cuentas privadas. </h2>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> InstaFight! </h1>
        </header>      
        <br/> 

        <p> Nota: Agregue los usuarios sin el @ al princicio </p>

        <FormularioPeleadores peleadores={this.peleadores.bind(this)}/>
        <br/>

        <div> {pelea} </div>

        <div> {error} </div>

        <div> {ganador} </div>
        <div> {img} </div>
        <div> {follows} </div>

        <Historial historial={this.state.historial}/>
      </div>
    );
  }
}

export default App;
