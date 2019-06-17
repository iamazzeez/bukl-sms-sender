import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div class="jumbotron">
  <h1 class="display-3">Send Bulk SMS</h1>
  <p class="lead">Import excel sheet with Phone Numbers column, and send custom sms to all that numbers in just one click</p>
  <hr class="my-4"/>
  <div class="form-group">
      <label for="exampleInputFile">Import Excel</label>
      <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
    </div>
    <div class="form-group">
      <label for="exampleTextarea">Type Custom message</label>
      <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send</button>
</div>
  );
}

export default App;
