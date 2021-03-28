import React, { Component } from 'react';
import error from '../../images/error.gif';
import '../../css/TextArea.css';
import $ from 'jquery';
import axios from 'axios';
import CopyLayout from '../Copy/CopyLayout';
import swal from 'sweetalert';

class TextAreaX extends Component {
	constructor(props) {
        super(props);
        this.state = {
		    addressArray: [],       //this state will hold array with separ addresses from textarea input
		    coordinateArray: [],    //this state will hold array with ready coordinates returned by axios
		    textAreaInputX: '',     //textarea input
		    tempoTextAreaInputX: '' //fix for example coords
        };
 
        // This binding is necessary to make `this` work in the callback
	    this.run_This_Component_Functions_In_Queue = this.run_This_Component_Functions_In_Queue.bind(this); //runs all functions together
	    this.getFormValue = this.getFormValue.bind(this);
        this.runAjax = this.runAjax.bind(this);
	    this.htmlAnyResult = this.htmlAnyResult.bind(this);
    }
  
  
    componentDidMount(){}
	
	//Updating state on props change (when user clicks "Example" button)
	componentWillReceiveProps(nextProps) { 
        if (nextProps.exampleCoord !== this.state.tempoTextAreaInputX) { 
		    this.setState({ tempoTextAreaInputX: nextProps.exampleCoord });
            this.setState({ textAreaInputX:      nextProps.exampleCoord }); 
        }
    }
	
	
	//textarea input handle
	handleTextAreaChange(event){ 
        this.setState({textAreaInputX: event.target.value})  
    }
	 
   
    /*
    |--------------------------------------------------------------------------
    | just runs all functions together
    |--------------------------------------------------------------------------
    |
    |
    */
    run_This_Component_Functions_In_Queue() {
		
	    this.props.liftIfAjaxWasSuccessHandler(false); //send to App.js state (reset on start)
		
	    var promises = [];  //array that will hold all promises
	    var temp = [];     // temp array to store found coordinates before assigning it to this.state.coordinateArray
	
	    //if texarea is empty, stop anything further, show/hide <Error/> component
	    if(this.getFormValue() === false) {
		   
		    //display error text with function
		    //this.htmlAnyResult("<h2 class='red errorSign'>You submitted Empty Input</h2>");
            this.showResultDiv();
		  
		    //calling parent method from child {this.props. + method}-> passing/uplifting array with found coords to App.js, method is described in Parent App.js
		    this.props.liftFinalCoordsHandler([]); //sending empty array to reset this.state.arg1 in <App/>.js. Otherwise, when u found coordinates by texarea input and get the result and then solved to empty the input and click the "Geocode" button, the sign "Empty input" will appear, but table with prev coords result will stay
            this.props.liftErrorMsgHandler("You submitted Empty Input");
		    return false; 
	    }
	  
        //Resetting state to Null ,calling parent method from child {this.props. + method}-> passing/uplifting alert info, described in Parent App.js
	    this.props.reset_techInfo_State("x");
	
	    var thatX = this;
		
	    //run axios ajax in loop
	    this.runAjax(promises, temp, thatX); //must pass {promises,temp} as arg to make them visible in function runAjax()//!!!!!!! RETURN ME===============
	  
	    //All promises, The way to detect that all axios ajax were completed. 1. we add {var promises = [];} 2. {promises.push(every ajax)}
	    //runs when for loop iteration axios ajax requests are completed
	    Promise.all(promises)
            .then(() => {
		        this.props.techInfoHandler("all promises " + temp); 
	  
			    //adding array with with final ajax coordinates to this.state---------
	            let coordsTempArray = this.state.coordinateArray; 
                coordsTempArray.push(temp); //addressArray = [[arrayX2]];	
               
			    this.setState({ 
                    coordinateArray: temp 
                }); 
			   
		       this.props.techInfoHandler("final state Promise.all length " + this.state.coordinateArray[0].length + " Array contains: " + this.state.coordinateArray[0]);   
		       this.props.liftFinalCoordsHandler(this.state.coordinateArray); 
			   this.props.liftIfAjaxWasSuccessHandler(true);       //send to App.js state
	  
            })
		    .then(() => {
               this.showResultDiv();
		    })
            .catch((e) => {
			    //Final SweetAlert goes here!!!!!!!!!!!!!!!!!!!!
			    swal("Failed!", "MapBox request crashed", "error"); 
			    this.props.liftIfAjaxWasSuccessHandler(false);//send to App.js state
                //HTML Result div with animation-------
                this.showResultDiv();
            });	  
    }
  
  
    //gets the textarea value, split it to array and set to state
    getFormValue(){
	    if (this.state.textAreaInputX.trim()=== ""){
			swal("Failed!", "No input", "error"); 
            return false;		 
	    }
	   
	     if (this.state.textAreaInputX.length < 6){
			swal("Failed!", "Input must be more than 4 chars", "error"); 
            return false;		 
	    }
	   
	   //check if "You submitted Empty Input" error sign exists and remove it if it does exists. it is done to prevent this sign to appear again if further input is not empty. Otherwise, new table coors result will appear, but error sign will remain on the screen
	   if ($(".errorSign").length){
           //alert('Does exist!');
	       $(".errorSign").remove();
       }


	   let textareaX = this.state.textAreaInputX; 
       textareaX = textareaX.trim();
	   let arrayX2 = textareaX.split('\n');
	   this.props.techInfoHandler("arrayX2: " + arrayX2);   
	   
	   let addressTempArray = this.state.addressArray; 
	   addressTempArray.unshift(arrayX2); //adds to array in this way: addressArray = [[arrayX2]]; //MEGA FIX, change push() to unshift()
	   
       this.setState({ 
           addressArray:addressTempArray
       }); 
 
    }
   
   
   
   
   
   /*
    |--------------------------------------------------------------------------
    | runs axios ajax
    |--------------------------------------------------------------------------
    |
    |
    */
    runAjax(promises, temp, thatX) { //must accept args {(promises, temp, thatX)}
		$("#loading").fadeIn(200); //show preloader
	
		for (let j = 0; j < this.state.addressArray[0].length; j++) { 
            promises.push(axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.state.addressArray[0][j] + '.json?country=us&access_token=' + process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN)   
            .then(function (response) {
			    if(response.statusText == "OK"){
                    temp.push(response.data.features[0].center[1], response.data.features[0].center[0]);
                    thatX.props.liftErrorMsgHandler("Request was successfull"); //send to App.js state
			    } else { 
					thatX.props.liftErrorMsgHandler("Sorry, there was an error, check your input");

			    }						   
            })
		    .then(function (response) { 
            })
				
			.catch(function(errX) { 
				thatX.props.liftErrorMsgHandler("Sorry, there was an error, check your input"); //fires here
				if(errX.response.data.message == null ){  
					thatX.props.liftErrorMsgHandler("Sorry, there was an error, check your input-3");
				}
				if(errX.response.data.message && errX.response.data.message.toString().match(/Not Authorized/g)){ 
				    thatX.props.liftErrorMsgHandler("Error: Not Authorized - Please provide MapBox access token");
				} else { 
					thatX.props.liftErrorMsgHandler("Sorry, there was an error, check your input");
				}
				   
            })
			);	
		}
    }
   
   
   
   /*
   |--------------------------------------------------------------------------
   | Logic to Html the result with function
   |--------------------------------------------------------------------------
   |
   |
   */
    htmlAnyResult(textX){ 
	    $("#resultFinal").stop().fadeOut("slow",function(){ 
            $(this).append(textX);   //use .append() instead of .html() to remove this <h2> error sign if texarea input is not empty
        }).fadeIn(11000);

        $("#resultFinal").css("border","1px solid red"); 
    }
   
   /*
    |--------------------------------------------------------------------------
    | Show Result Div
    |--------------------------------------------------------------------------
    |
    |
    */
    showResultDiv(){ 
	    $("#resultFinal").stop().fadeOut("slow",function(){ 
        }).fadeIn(2000);
        $("#resultFinal").css("border","1px solid red"); 
	    $("#copyButton").css("display","block");
    }
   
  
    //RENDER ------------------------------------------------
    render() {
        return (
	      <div>
	        <CopyLayout/>
	        <form className="textarea-my" >
              <textarea id="coordsInput" rows="8" cols="80" placeholder="Your address here to geocode..." value={this.state.textAreaInputX} onChange={this.handleTextAreaChange.bind(this)} /> 
              <input type="button" className="btn btn-primary btn-md" value="Geocode" id="splitButton" onClick={this.run_This_Component_Functions_In_Queue} />	
             </form>
		  </div> 
        );
    }
}

export default TextAreaX;
