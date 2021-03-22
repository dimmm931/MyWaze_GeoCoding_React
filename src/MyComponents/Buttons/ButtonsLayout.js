import React, { Component } from 'react';
import $ from 'jquery'; 
import '../../css/Buttons.css';

class ButtonsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
		sampleCoordinates: "22802 WESTERN AV, TORRANCE, 90501\n1601 Kingsdale Ave, Redondo Beach, CA 9027\n3525 W Carson St, Torrance, CA 90503\n20401 Victor St, Torrance, CA 90503\n2015 W Redondo Beach Blvd C, Gardena, CA 90247"
    };
 
    // This binding is necessary to make `this` work in the callback
    this.exampleClick = this.exampleClick.bind(this);
	this.clearClick = this.clearClick.bind(this);
	this.InstructClick = this.InstructClick.bind(this);
  }
  
  exampleClick() {
     $("#coordsInput").val(this.state.sampleCoordinates);
  }
  
   clearClick() {
     $("#coordsInput").val("");
	 $("#resultFinal").hide(1000);
	 $("#hiddenInstructions").hide(1000);
	 $("#instructionButton").val("instructions");
	 $("#copyButton").hide(1000); //hide copy button Component
	 // calling parent method from child {this.props. + method}-> passing/uplifting array with found coords, described in Parent App.js
	 this.props.clearStateHandler('xText');//!!!!!!!!!!!!!   
  }
  
   InstructClick() {
     if ($("#instructionButton").attr("value")==="instructions") {
                $("#instructionButton").val(" _Close_ ");
				$("#hiddenInstructions").show(1000);
     } else {  
		        $("#instructionButton").val("instructions");
				$("#hiddenInstructions").hide(1000);
	 }	
   }
  
  render() {
      var clearStateHandler =  this.props.clearStateHandler ; // lifting state up to parent
      return (
	  
	    <div className="buttons">
	        { /*<!-- Upper  buttons--> */ }
            <input type="button" value="example" id="examplebutton" className="btn btn-success btn-md el" onClick={this.exampleClick}/> 
		    <input type="button" value="instructions" id="instructionButton" className="btn btn-primary btn-md el" onClick={this.InstructClick}/> 
		    <input type="button" value=" clear " id="clearButton" className="btn btn-danger btn-md el" onClick={this.clearClick}/>
            <select className="select-my el">
                <option value="us">US</option>
                <option value="1">Other Country</option>
                <option value="2">Other Country1</option>
            </select>
	</div>
  
    );
  }
}

export default ButtonsLayout;