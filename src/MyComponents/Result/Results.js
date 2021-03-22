import React, { Component } from 'react';
import '../../css/Results.css';
import $ from 'jquery';

class Results extends Component {
	  constructed_answer2 = '';
	  constructor(props) {
          super(props);
		  this.state = {  
            //flag: true,	
            //count: 0,			
          };
          //var handleToUpdate = this.handleToUpdate.bind(this);  //for catching lifted state from LiftedFrom_Component
	      this.run_Result = this.run_Result.bind(this);
      } 
	
	  componentDidMount() {} 
	 
	  
	  
      //constructs  result based on passed this.props.resultX
      run_Result(){
	     $("#loading").fadeOut(1900); //hide preloader
	     let final_all = '';
	     let flag = false;
	  
	     //checks if passes props is array or string  
	     if(typeof this.props.resultX === 'string' ) { 
		     flag = false;
		     this.constructed_answer2 = <p> {this.props.resultX}</p>;
			 return false; //new breaking
				 
	     } else {
		
	         //console.log(this.props.resultX[0]);
             this.constructed_answer2 = this.props.resultX.map((coords, i, arrayX) =>{ {/* maps() args=>(content, iterator, arryitself)*/}
	             if (i%2 === 0) {
	                 return(
                       <tr key={coords.toString()}>
			             <td>
		                {coords} 
				        </td>
				   
				        <td>
				        {arrayX[i + 1]}  {/* next coors from array */}
				        </td>
		                </tr>
		             );
		         }
            });
	        flag = true;
	     }   
	    
      }
	  
      render() {
	     this.run_Result();
         return (
	         <div className="results" id="resultFinal">
			   
		       <p className='red'> React Results found =>  {this.props.resultX.length/2}  </p>
			   <table id='tableResults'>{/* adding id that will be copied further */}
			      <tbody>{/* acaused crash without tbody nesting*/}
	              {/*  final  results  go  there  */} 
		          {this.constructed_answer2 }
			      </tbody>
			   </table>
             </div>
	  
         );
      }
}

export default Results;