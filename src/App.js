
import React, { Component } from 'react'
import * as XLSX from 'xlsx';



export default class App extends Component {
   state = {
     text: '',
     numbers: [],

   }

   onChangeHandler = (e) => {
     this.setState({
       text : e.target.value
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
      numbers: flattenArr
    })
   ;
};
reader.readAsBinaryString(input);
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
    <button type="submit" class="btn btn-primary">Send</button>
</div>
      </div>
    )
  }
}




