import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: ''
    }
    this.handleConvert = this.handleConvert.bind(this);
  }

  componentDidMount() {
    $('#inputTextArea').keypress((e)=>{
      if(e.which===13) {
        this.handleConvert()
      }
    })
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleConvert() {
    const val = this.state.input;
    const output = val.replace(/\"([^(\")"]+)\":/g,"$1:");
    this.setState({output: output});
  }

  render() {
    return (
      <div className="ui App two column grid">
        <div className='column'>
          <div><h3>JSON String</h3></div>
          <div className='ui form field'><textarea id='inputTextArea' rows={40} type='text' value={this.state.input} onChange={this.handleInputChange.bind(this)} onClick={(event)=>$(event.target).select()} /></div>
        </div>
        <div className='column'>
          <div><h3>JSON Object: </h3></div>
          <div className='ui form field'><textarea readOnly rows={40} type='text' value={this.state.output} onClick={(event)=>$(event.target).select()} /></div>
        </div>

      </div>
    );
  }
}

export default App;
