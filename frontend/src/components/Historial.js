import React, { Component } from "react";

export default class ListaHistorico extends React.Component {
  render() {
    return (
      <div>
        <h2>Historial</h2>
        <div>
          {this.props.historial.map(r => {
            return (
                <p>
                  {r.peleador1} vs {r.peleador2}
                </p>
            );
          })}
        </div>
      </div>
    );
  }
}