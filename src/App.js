import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Header from './MyComponents/Header/Header';
import ButtonsLayout from './MyComponents/Buttons/ButtonsLayout';
import Instructions from './MyComponents/Instructions/Instructions';
import Results from './MyComponents/Result/Results';
import TextAreaX from './MyComponents/TextArea/TextArea';
//import LiftedFrom_Component from './MyComponents/LiftUpComponent/LiftedFrom_Component';
import ErrorLayout from './MyComponents/Error/ErrorLayout';  //display error gif
import TechnicalInfo from './MyComponents/TechInfo/TechnicalInfo';  //displays info instead of alert

class App extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
		    arg1: [],             //this state will hold lifted up var(onClick) or array with coordinates
		    finalCoords:[], 
		    techInfoState:[],     //state to store alert info
		    baseState : [],
		    exampleCoords: '',    //stores example coords, when user clicks "Example" in ButtonsLayout
		    ifAjaxSuccess: false, // if ajax was OK
		    ifAjaxFailed:  false,
		    errMessage: 'Error msg'
        };
	   
       /*
        var handleToUpdate = this.handleToUpdate.bind(this);  //for catching lifted state from LiftedFrom_Component
	    var liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);  //for catching lifted state from TextArea Comp
	    var clearStateHandler = this.clearStateHandler.bind(this);  //cathes lifted state from Buttons layout - //for lifting and clearing the state up in the parent
	    var techInfoHandler = this.techInfoHandler.bind(this);  //for lifting techInfo(instead of alerts)the state up in the parent
        var reset_techInfo_State = this.reset_techInfo_State.bind(this);  //
        var liftErrorMsgHandler = this.liftErrorMsgHandler.bind(this);		
       */
       
        // preserve the initial state in a new object
        this.baseState = [];  		
    } 

	
	//methodfor catching lifted state from LiftedFrom_Component, triggerd onClick
    handleToUpdate(someArg){
        this.setState({arg1:someArg});
    }
	
	
	//method for catching lifted state from TextArea.js Component, triggered manually by {this.props.liftFinalCoordsHandler(this.state.coordinateArray[0])} in TerxArea.js
    liftFinalCoordsHandler(someArgCoords){
        this.setState({arg1:someArgCoords});
    }
	
	//reseting state arg1 onClick button="Clear"
	clearStateHandler(vv){
        this.setState({arg1:''});
    }
	
	//for lifting techInfo(instead of alerts)the state up in the parent
	techInfoHandler(techAlert){
		const alertTempArray = this.state.techInfoState; //getting state to temp array
		alertTempArray.push(techAlert); //adds to array in this way: addressArray = [[arrayX2]];
		//sets new value to state
		this.setState({ 
            techInfoState: alertTempArray
        }); 
	}
	
	
	//for clearing state techInfoState on every Button click
	reset_techInfo_State(some){
		this.setState({ //sets new value to state //setState is an async function
           techInfoState: this.state.baseState
       }); 
	}
    
	//method for catching lifted state from TextArea.js Component, triggered  in TerxArea.js
    liftErrorMsgHandler(message){
        this.setState({errMessage: message});
    }
	
	//method for catching lifted state from ButtonsLayout.js Component, triggered  in ButtonsLayout.js
    liftsampleCoordsHandler	(sampleCoords){ 
        this.setState({exampleCoords: sampleCoords} //Set state asynchronous
		   ,() => {
          //Do something here...for instance send{this.state.smsTextChild} to parent <App/>, send it as callback
	      //alert(this.state.exampleCoords);
       });
    }
	
	//method for catching lifted state from TextArea Component, triggered  in TertArea.js
    liftIfAjaxWasSuccessHandler	(status){ 
        this.setState({ifAjaxSuccess: status});
    }
	
  render() {
	  var handleToUpdate =  this.handleToUpdate; //for catching lifted state from LiftedFrom_Component
	  var liftFinalCoordsHandler  =   this.liftFinalCoordsHandler; //for catching lifted state from TextArea.js Component
	  var clearStateHandler =  this.clearStateHandler ; //for lifting and clearing the state up in the parent
      var techInfoHandler = this.techInfoHandler;  //for lifting techInfo(instead of alerts)the state up in the parent
	  var reset_techInfo_State = this.reset_techInfo_State;
      var liftErrorMsgHandler = this.liftErrorMsgHandler;
      var liftsampleCoordsHandler = this.liftsampleCoordsHandler;	
	  var liftIfAjaxWasSuccessHandler = this.liftIfAjaxWasSuccessHandler //ajax status;	

	  
  
	  
    return (
	 
	    <div className="wrapper grey">
            <div className="container"> {/*<!-- container-full -->*/}
	            <div className="row row1">
                    <div className="col-sm-12 col-xs-12 divX App"> 
		                <h4> {this.props.name} {/* props are set in index.js */}
						    <img src={logo}  className="react-logo-static" alt="logo" />
						</h4>
			            <Header nameX = "ReactJS"/>  { /* header component*/ }
						
						{/* buttons component */}
						<ButtonsLayout 
						    clearStateHandler = {clearStateHandler.bind(this)}
							liftsampleCoordsHandler = {liftsampleCoordsHandler.bind(this)}/> 
							
						<Instructions/>    { /* instructions component */ }
						
						{ /* results component */ }
						<Results 
						    resultX     = {this.state.arg1} 
							errorMsg    = {this.state.errMessage}
							ifAjaxOk    = {this.state.ifAjaxSuccess}
							ifAjaxError = {this.state.ifAjaxFailed}/> 
							       
						
						{/* CORE textarea component */}
						<TextAreaX 
						    exampleCoord                = {this.state.exampleCoords}
							
						    liftFinalCoordsHandler      = {liftFinalCoordsHandler.bind(this)}  
							techInfoHandler             = {techInfoHandler.bind(this)} 
							reset_techInfo_State        = {reset_techInfo_State.bind(this)} 
							liftErrorMsgHandler         = {liftErrorMsgHandler.bind(this)}  
							liftIfAjaxWasSuccessHandler = {liftIfAjaxWasSuccessHandler.bind(this)} />
							
						<TechnicalInfo techInfoData={this.state.techInfoState}  numbers={this.state.arg1}  handleToUpdate = {handleToUpdate.bind(this)} /> { /* displays info instead of alert */ }
		                <p> Ajax Status: {this.state.ifAjaxSuccess ? ' true' : 'false'}</p>
					</div>
					
			    </div>
			</div>
			    <ErrorLayout/> { /* error gif animation component */ }
		</div>
    );
  }
}

export default App;