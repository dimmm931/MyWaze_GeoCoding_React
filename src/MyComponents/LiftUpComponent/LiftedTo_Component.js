import React, { Component } from 'react';
import TrendTopic from './TrendTopic';

class LiftedTo_Component extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
   }
  
  render() {
    return (
	   <div className="lifted-to">
		   <h5>
		       <p className="underline">
		           LiftedTo_Component is => 
			   </p>
			   {this.props.liftedValue} {/* here goes lifted from Parent app.js value*/}
		   </h5>      
	   </div> 
    );
  }
}

export default LiftedTo_Component;
