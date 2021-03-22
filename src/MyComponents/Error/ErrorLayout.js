import React, { Component } from 'react';
import errorIMG from '../../images/error.gif';
import '../../css/Error.css';
import $ from 'jquery';

class ErrorLayout extends Component {
	constructor(props) {
        super(props);
        this.state = {
		    //addressArray: [],  //this state will hold array with separ addresses
        };
    }
  
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
