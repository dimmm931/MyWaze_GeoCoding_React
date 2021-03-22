import React, { Component } from 'react';
import errorIMG from '../../images/error.gif';
import '../../css/Error.css';
import $ from 'jquery';
//import axios from 'axios';

class ErrorLayout extends Component {
	constructor(props) {
    super(props);
    this.state = {
		//addressArray: [],  //this state will hold array with separ addresses
    };
 
    // This binding is necessary to make `this` work in the callback
	//this.copy_table_result = this.copy_table_result.bind(this);
  }
  

  
  
  
  
   
   
   
  
  //RENDER ------------------------------------------------
  
  render() {
    return (
	    <p className="error-parent">
		    {/* Hidden loading copy indicator */}
		    <span id='error_loading'>
			    <img src={errorIMG}  className="error-img" alt="logo" />  {/*  hidden by default */}
		    </span>  
		</p>
    );
  }
  
}

export default ErrorLayout;
