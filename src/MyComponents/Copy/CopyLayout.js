import React, { Component } from 'react';
import copyIMG from '../../images/loaddd.gif';
import '../../css/Copy.css';
import $ from 'jquery';

class CopyLayout extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
 
        // This binding is necessary to make `this` work in the callback
	    this.copy_table_result = this.copy_table_result.bind(this);
	    this.scrollResults = this.scrollResults.bind(this);  //advanced scroll
    }
                                                                               
    copy_table_result() {
	  
	    //creating new textarea element and giveing it id 't'
        var t = document.createElement('textarea');
        t.id = 't';
        // Optional step to make less noise in the page, if any!
        t.style.height = 0;
        //You have to append it to your page somewhere, I chose <body>
        document.body.appendChild(t);
        // Copy whatever is in your div to our new textarea
        t.value = document.getElementById('tableResults').innerText;
        // Now copy whatever inside the textarea to clipboard;
        var selector = document.querySelector('#t');
        selector.select();
        document.execCommand('copy');
        // Remove the textarea;
        document.body.removeChild(t);
	
	    //Scroll to results in Mobile only
	    if(window.screen.width <= 640){ 
	        this.scrollResults( "#flashMessage"); //advanced, the 2nd arg is not called here
	    }
	
	    //show text "Copied!!!"
	    $('#flashMessage').html(' Copied!!!!!!!');
	    setTimeout(function(){ $('#flashMessage').html(''); }, 2000);

	    //show hidden loading copy indicator img
	    $('#copy_loading').fadeIn(2500);
	    setTimeout(function(){ $('#copy_loading').fadeOut(4500); }, 2000);
    }
  
    // Advanced Scroll, it scrolls the page to certain div.
	scrollResults(divName, parent)  //arg(DivID, levels to go up from DivID)
	{  
		if (typeof(parent)==='undefined') {
            $('html, body').animate({
                scrollTop: $(divName).offset().top
             }, 'slow'); 
		} else {
			//if 2nd argument is provided
			var stringX = "$(divName)" + parent + "offset().top"; 
			$('html, body').animate({
                scrollTop: eval(stringX)         
            }, 'slow'); 
		}
	}
  
    //RENDER ------------------------------------------------
    render() {
        return (
	        <p>
	            <input type="button" className="btn btn-primary btn-md" value="<Copy>" id="copyButton" onClick={this.copy_table_result} />   
		        <span id='flashMessage' className='red'></span>
		        {/* Hidden loading copy indicator img */}
		        <span id='copy_loading'>
			        <img src={copyIMG}  className="img-header" alt="logo" />  {/*  hidden by default */}
		        </span>  
		    </p>
        );
    } 
}

export default CopyLayout;