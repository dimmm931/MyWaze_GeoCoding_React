import React, { Component } from 'react';
import '../../css/Results.css';
import $ from 'jquery';

class Results extends Component {
	  constructor(props) {
          super(props);
		  this.state = {  
            //flag: true,	
          };
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
		     //this.constructed_answer2 = "";//<span> {this.props.resultX}</span>;
			 return false; 
				 
	     } else {
		
             this.constructed_answer2 = this.props.resultX.map((coords, i, arrayX) =>{ 
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
			   <p className="errMsg"> {this.props.errorMsg} </p> {/* error message */}
			   
			   <div className={this.props.ifAjaxOk ? 'visible-div' : 'hidden-div'}> 
		         <p className='red'> React Results found =>  {this.props.resultX.length/2}</p>
			     <table id='tableResults'>{/* adding id that will be copied further */}
			       <tbody>{/* caused crash without tbody nesting */}
	               {/*  final  results  go  there  */} 
		           {this.constructed_answer2}
			        </tbody>
			     </table>
			   </div>
			   
             </div>
	  
         );
      }
}

export default Results;