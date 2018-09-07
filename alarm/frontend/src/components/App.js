import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import MainPage from './MainPage';

class App extends Component {
	render(){
		return(
			<div id="mainApp">
				<MainPage/>
			</div>
		)
	}
}
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;