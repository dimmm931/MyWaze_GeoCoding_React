import React, { Component } from 'react';
//import logo from '../../images/api.jpeg';
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
		//this.run_Loc_Storage = this.run_Loc_Storage.bind(this);//not used
		//this.incrementState = this.incrementState.bind(this);
		
		
		//this.run_Loc_Storage();
		//this.incrementState(); //run this.state.count increment
    } //end constructor
	
	 
	 
	 componentDidMount() {
     } 
	 
	 
	 
   //NOT USED //Increment this.state.count + WORKING SETTIMEOUT() //not used
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
	incrementState = () => {
        this.setState(prevState => {
           return {count: prevState.count + 2}
        });
		
		 setTimeout(() => {
              alert("this.state.count " + this.state.count); 
           }, 1000);
    }
   // **                                                                                  **
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************	
   

	
  //NOT USED //deactivated, should be triggred in constructor. An abortive attempt to use local storage for animation limiting
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
	  run_Loc_Storage(){
	  
	   if (localStorage.getItem("localA_Animation_token_991") != null) { // If Local Storage was prev created and exists
		    var retrievedObject = localStorage.getItem('localA_Animation_token_991'); // get Loc Storage item
			var retrievedObject = JSON.parse(retrievedObject);
			alert ("Loc St exists" + JSON.stringify(retrievedObject, null, 4) + " length: " + Object.keys(retrievedObject).length);
			
	   } else {
        
		   // if Loc Storage does not exist (i.e Object was never initialized), create a new Object
	       if (typeof retrievedObject == "undefined") {
               alert("Object will be created now");
		       retrievedObject = { }; //empty object for all cart products
			   
			   //var prodName = "loc_storage_flag";
			   retrievedObject["loc_storage_flag"] = true;
		       localStorage.setItem('localA_Animation_token_991', JSON.stringify(retrievedObject));
		   }
	   }
	  
	  }
   // **                                                                                  **
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************	
	  
	  
	  
   //constructs  result based on passed this.props.resultX
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
 
  run_Result(){
	 //alert("run Result"); 
	  //alert("render");
	  $("#loading").fadeOut(1900); //hide preloader
	  //let constructed_answer2 = '';
	  let final_all = '';
	  let flag = false;
	  
	  //check if this props in null
	 /* if(this.props.resultX.length === 0){
		  alert(88); 
		  flag = false;
		  return false; //new breaking
		  }
	*/
	
	
	//alert("this.props.resultX length " + this.props.resultX.length);
	
	  
	
	  //checks if passes props is array or string  
	  if( typeof this.props.resultX === 'string' ) { //will never fire, just for test
	    //$("#resultFinal").html("");
		//alert(2222);
		flag = false;
	    return false; //new breaking
		
		
	    //alert("String detected in State_Array_List_Builder");
		//instead of alert, it calls parent method from child {this.props. + method}-> passing/uplifting alert info to method techInfoHandler described in Parent App.js
	    //this.props.techInfoHandler("String detected in State_Array_List_Builder"); 
		
		this.constructed_answer2 = <p> {this.props.resultX}</p>;
		
	} else {
		//alert(4444);
		//final_all = "<p class='red'>React Results found => " + this.props.resultX.length/2 + "</p>"; //must be at least empty defined to avoid "undefined" appearance
		//final_all += "<table id='tableResults'>"; //adding div that will be copied further
		
	   //alert("Array");
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
	
	  
	  
	 
	  
	  
	  
	  //an abortive attempt to use local storage for animation limiting
	  /*
	   var retrievedObject = localStorage.getItem('localA_Animation_token_991'); // get Loc Storage item
	   var retrievedObject = JSON.parse(retrievedObject);
	  */
	  
	   
	   
	 
	
	  // HTML  Result div  with  animation; -> moved to TextArea.js to  {Promise.all(promises).then(() => {}
       /* $("#resultFinal").stop().fadeOut("slow",function(){ 
            //$(this).html(res)
        }).fadeIn(1000);
        $("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div
		$("#copyButton").css("display","block");
	 */
	  
	
	 
	 //an abortive attempt to use local storage for animation limiting
     /*	 
	 retrievedObject['loc_storage_flag'] = false;
	 localStorage.setItem('localA_Animation_token_991', JSON.stringify(retrievedObject)); 
	 */	
			   
			   
			   
	//alert("constructed_answer2" + this.constructed_answer2);
    //END checks if passes props is array or string
	   
	    
  }
	  
  // **                                                                                  **
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************	
	

  
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
