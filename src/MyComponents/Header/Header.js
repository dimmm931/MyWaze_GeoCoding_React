import React, { Component } from 'react';
import logo from '../../images/api.jpeg';
import logo2 from '../../images/loading2.gif';
import '../../css/Header.css';

class Header extends Component {
  render() {
    return ( 
	  <div>
	    <h1>Geocoding Module =>  {this.props.nameX}</h1>
	    <img src={logo} id="ap" className="App-logo" alt="logo" />
		<span id='loading'>
	      <img src={logo2}  className="img-header" alt="logo" />  {/*  hidden by default */}
		</span>  
		<span id="loadAjax"> </span>
        <span id='addressQuantity' className="red"></span>
	  </div> 
    );
  }
}

export default Header;