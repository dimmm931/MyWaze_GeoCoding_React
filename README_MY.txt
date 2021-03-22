Waze geocoding React version.
#Works on MapBox Api, on js only, php side is not engaged.
Two main components are:
  a.)<TextArea/> (which  gets addresses input value, splits it to array, 
  sends axos ajax and gets final coords array and pass/uplift it to parent <App/>) 
  
  b.)<Result/> (which displays final coords array from this.state.arg1). 
  <Result/> is hidden by default, it JS turns visible in <TextArea/> in promise .then().
===============================


How it works:
1. Index.js is a JS entry point, it contains <App/> Component, 
which contains all the rest component { <Header nameX = "ReactJS"/> , <ButtonsLayout/> , <Instructions/>, <TextAreaX/>}

2. All core logic is in <TextAreaX/> Component.
2.1 OnClick "Geocode" button it runs onClick={this.run_This_Component_Functions_In_Queue}, function that runs all functions together.

2.3 Firstly {run_This_Component_Functions_In_Queue} runs {this.getFormValue()},
 that checks if textarea is not empty, split addresses to array and save that array to state ->this.state.addressArray.
 
2.3 Secondly, {run_This_Component_Functions_In_Queue} runs { this.runAjax(promises,temp);},
 that in loop send axios ajax using {this.state.addressArray[0].length}.
 
Each axios is added to array promises[] in order to know, 
when all axios requests are completed {promises.push(axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.state.addressArray[0][j]....} 

2.4 Thirdly, in {{run_This_Component_Functions_In_Queue}} we check if all axios are finished -> Promise.all(promises).then(() => {...},
 assign temporay array with axios results to state=> this.state.coordinateArray and previously we used to start function this.drawResult(), which used JQ to html() coordinates;
 Now, we deactivated this function {this.drawResult()} as we use <Results/> with state.arg1, i.e  <Results resultX={this.state.arg1}/>.
 {State.arg1} is an array with final coordinates passed/uplifted from <TextArea/> to parent <App/> with callback:
  this.props.liftFinalCoordsHandler(this.state.coordinateArray/*[0]*/).
  
2.5 Previously, we had problem with multiple rendering <Results/> and mutliple html-ing()(css blinking) the same result, so we moved this code to <TextArea/> in 
  {.then(() => { $("#resultFinal").stop().fadeOut("slow",function(){ .......}. This {.then} runs only after getting all final coords.
 
 
3. Component description
3.1 <Technical_Info> - component for testing
  Componenents that has gone to <Technical_Info/> : 
  <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/> , it send/uplift state to parent <Technical_Info>
  <LiftedTo_Component liftedValue={this.state.arg1}/> , it accepts state from parent <Technical_Info>
  <State_Array_List_Builder numbers={this.state.arg1}/>, test building the display upon the passed state array
  
3.2 <ErrorLayout/> component that is hidden be default, it shows error gif animation if there is no input in textarea.

3.3 <TextArea/> - core component
 
==================================================

How to uplift var value from child component to Parent state, triggered on direct onClick action:
1. In Child comp add to render section => {  render() { var handleToUpdate  = this.props.handleToUpdate;}
2. In Child comp add to return section => {<button onClick={() => handleToUpdate('some var to lift')}>}
3. In Parent comp add to constructor(props){} =>  var handleToUpdate = this.handleToUpdate.bind(this);
4. In Parent comp add to constructor(props){} the body of method/func  => handleToUpdate(someArg){this.setState({arg1:someArg});}
5. In Parent comp call the Child component itself => <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/>

==========

How to uplift var value from child component to Parent state manually(without onClick), triggered in some child function by direct function calling:
1. In Child comp in a place u want, call the parent method and pass to its arg neccessary values data {this.props.liftFinalCoordsHandler(this.state.coordinateArray[0])}
2. In Parent comp add  binding to constructor(props){} =>var liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);  //for catching lifted state from TextArea Comp
3. In Parent comp describe the method and what to do with passed argument=>
   //method for catching lifted state from TextArea.js Component, triggered manually by {this.props.liftFinalCoordsHandler(this.state.coordinateArray[0])} in TerxArea.js
    liftFinalCoordsHandler(someArgCoords){
        alert('TextArea from Child(TextArea.js) to Parent(App.js): ' + someArgCoords);
        this.setState({arg1:someArgCoords});
    }
4. In Parent comp add to render section => var liftFinalCoordsHandler =  this.liftFinalCoordsHandler ;
5. In Parent comp call/declare Child Component itself with params=> <TextAreaX liftFinalCoordsHandler = {liftFinalCoordsHandler.bind(this)}/>, no matter it is not triggered on click

====================================================

How to pass state from Parent to Child=> {<LiftedTo_Component liftedValue={this.state.arg1}}, then in Componenent dispaly by {this.props.liftedValue}





====================================================

How to BUILD/Pack APP for hosting server
Folder "BUILD" is for ready created app with all minified concatenated dependencies.
Created by CLI-> npm run build.

Known Problem Issue: path to js,css in BUILD should be without "/" in beginning => 
 1. "static/js/...", not "/static/js/"
 2. "favicon"
 3.GIF imge was not loading => change to {e.exports=/*a.p+*/"static/media/loading2.f7ccc9e1.gif"} in build/static/js/main.91b5d174.chunk.js



========================================================
ERROR GIF LOADER:
Error Loader is located in <ErrorLayout/>, it is display:none by default.
If input is empty Error Loader is triggered in <TextArea/>:
  $('.App').addClass('blur');  //blur the background
  $(".error-parent").fadeIn(2500); //show error gif from <Error/>
