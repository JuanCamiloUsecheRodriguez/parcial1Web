import React, { Component } from "react";

export default class FormFight extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			peleador1: null,
			peleador2: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getPeleador1 = this.getPeleador1.bind(this);
		this.getPeleador2 = this.getPeleador2.bind(this);

	}	

	getPeleador1(event){
		this.setState({peleador1: event.target.value});
		const m = this.state.peleador1;
		console.log(m);
	}

	getPeleador2(event){
		console.log(event.target.value);
		this.setState({peleador2: event.target.value});
		const m = this.state.peleador2;
		console.log(m);	
	}

	handleSubmit( ) {
		const c1 = this.state.peleador1;
		const c2 = this.state.peleador2;
		this.props.peleadores(c1, c2);
		const m = this.state.peleador1+ " vs " + this.state.peleador2;
		console.log(m);
	}

	render () {
		return(
			<div>
				<div>
					<input placeholder = "Peleador 1"
                		onChange={(evt)=>this.getPeleador1(evt)}
                		required/>
             	</div>
             	<div>
             		<input placeholder = "Peleador 2"
             			onChange={(evt)=>this.getPeleador2(evt)}
                		required/>
                </div>
                <button className="btn btn-primary" id="boton" onClick={()=>this.handleSubmit()}>A pelear</button>
            </div>
			)		
	}	
}