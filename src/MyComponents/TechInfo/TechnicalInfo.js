import React, { Component } from 'react';
import '../../css/Technical_Info.css';
import StateArrayListBuilder from '../Build_List_from_State_Array/State_Array_List_Builder';  //Component creates List from State Array
import LiftedFromComponent from '../LiftUpComponent/LiftedFrom_Component';
import LiftedToComponent from '../LiftUpComponent/LiftedTo_Component';
import $ from 'jquery';


class Technical_Info extends Component {
	constructor(props) {
        super(props);
        this.state = {	
        };
 
        // This binding is necessary to make `this` work in the callback
        var handleToUpdate = this.handleToUpdate.bind(this);  //for catching lifted state from LiftedFrom_Component
    }

    //methodfor catching lifted state from LiftedFrom_Component, triggerd onClick
    handleToUpdate(someArg){
	    this.props.handleToUpdate(someArg);
    }
  
  
  render() {
	  var handleToUpdate =  this.handleToUpdate; //for catching lifted state from LiftedFrom_Component
      var constructed_answer = this.props.techInfoData.map((techItem, i, arrayZ) =>{ {/* maps() args=>(content, iterator, arryitself)*/}
	       return(
               <li key={techItem.toString()}>
		          {techItem}
		       </li>
		   );   
      })
	  
      return (
				 
          <div className="dropdown">
              <button className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
			       Technical Info
                  <span className="caret"></span>
			  </button> {/*caret down*/}  
              <div className="collapse col-sm-12 col-xs-12 text-left" id="collapseExample">
			      <p className="underline"> Alerts Replacer: </p>
				  {constructed_answer} {/* alerts goes there */}
					 
				  <LiftedFromComponent handleToUpdate = {handleToUpdate.bind(this)}/> { /* LiftedComponent component, send/uplift value onClick to App.js */ }
				  <LiftedToComponent liftedValue={this.props.numbers}/>               { /* LiftedComponent component for catching lifted state from LiftedFrom_Component to App.js */ }
				  <StateArrayListBuilder numbers={this.props.numbers}/>               {/*techInfoHandler={techInfoHandler.bind(this)}*/}   {/* Component creates List from State Array*/}
              </div> 
          </div>
	  
      );
  }
}

export default Technical_Info;