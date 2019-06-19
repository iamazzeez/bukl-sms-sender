
import React, { Component } from 'react'
import * as XLSX from 'xlsx';

const msg91 = require("msg91")("280314AmKDVfxXc6UC5cfdf599", "TRQ_MTS", "4" );




export default class App extends Component {
   state = {
     text: '',
     numbers: '',
     numberInput: []
   }

   onChangeHandler = (e) => {
     this.setState({
       text : e.target.value
     })
   }

   onChangeHandlerNumbers = (e) => {
    this.setState({
      numbers : e.target.value
    })
   }

   onInputChangeHandelre = (evt) =>{
  let input = evt.target.files[0]
var name = evt.name;
const reader = new FileReader();
reader.onload = (evt) => {
    /* Parse data */
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, {type:'binary'});
    
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, {header:1});
   
    /* Update state */
    
    function flatten(arr) {
      return [].concat.apply([], arr);
    }
    let flattenArr = flatten(data)
    console.log(flattenArr)
    this.setState({
      numbers: flattenArr,
      numberInput: flattenArr
    })
   ;
};
reader.readAsBinaryString(input);
   }

   //Msg91 sms 
   
 onSend = () => {
//    msg91.send('9902932734', this.state.text, function(err, response){
//     console.log(err);
//     console.log(response);
// });
// console.log(JSON.stringify( this.state.numbers))
// console.log(JSON.stringify( this.state.numberInput))

fetch('http://localhost:5000/', {
  method: 'POST',
  body: JSON.stringify({ sms:   { message: this.state.text, to:  this.state.numberInput }  }),
  headers: {
    'Content-Type': 'application/json',
  }
}).then(res => {
  if(res.status !== 200 && res.status !== 201){
    throw new Error('Failed!')
  } 
  res.json().then(resData => {
  alert('User created')
  console.log(resData);
})
})
.catch(err => {
  console.log(err)
}) 

}


  render() {
    return (
      <div>
         <div class="jumbotron">
  <h1 class="display-3">Send Bulk SMS</h1>
  <p class="lead">Import excel sheet with Phone Numbers column, and send custom sms to all that numbers in just one click</p>
  <hr class="my-4"/>
  <div class="form-group">
      <label for="exampleInputFile">Import Excel</label>
      <input type="file"  onChange={this.onInputChangeHandelre} class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
    </div>
    <div class="form-group">
  <label class="col-form-label" for="inputDefault">Or Add Numbers</label>
  <input 
  type="text" 
  class="form-control" 
  placeholder="Add comma seperated Numbers" 
  id="inputDefault"
  value={this.state.numbers}
  onChange={this.onChangeHandlerNumbers}
  />
</div>
    <div class="form-group">
      <label for="exampleTextarea">Type Custom message {this.state.text}</label>
      <textarea 
      class="form-control" 
      id="exampleTextarea" 
      rows="3"
      value={this.state.text}
      onChange={this.onChangeHandler}
      ></textarea>
    </div>
    <button type="submit" onClick={this.onSend} class="btn btn-primary">Send</button>
</div>
      </div>
    )
  }
}




