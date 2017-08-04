import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

import { getDocs, deleteDoc } from './actions';


import PouchDb from 'pouchdb';
PouchDb.plugin(require('pouchdb-upsert'));

const couchUser = 'admin';
const couchPass = '8PpkXQ3p';
const couchIp = 'dev.db.stg.krispsystems.net';
const couchPort = '5984'
const pouchDbName = 'ks_db';

function getCouchSetupDbURL(tenant) {
  const pouch = new PouchDb(`http://${couchUser}:${couchPass}@${couchIp}/account_${tenant._id}`);
  return pouch;
}

class App extends Component {
  componentDidMount() {
    const TENANT = {
      _id: "b9c3978565c7f059864b7b16e6025b3f"
    };

    const localDb = new PouchDb(`http://localhost:5984/account_${TENANT._id}`);
    const remoteDb = getCouchSetupDbURL(TENANT);

    // SYNC LOCAL TO REMOTE
    localDb.sync(remoteDb, {
      live: true,
      retry: true,
      timeout: false
    }).on('change', function (change) {
      console.log('Sync Detected Change: ', change);

    }).on('paused', function (info) {
      console.log('Sync Paused: ', info);

    }).on('active', function (info) {
      console.log('Sync Active: ', info);

    }).on('denied', function (info) {
      console.log('Sync Denied: ', info);

    }).on('complete', function (info) {
      console.log('Sync Complete: ', info);

    }).on('error', function (info) {
      console.log('Sync Error: ', info);
    });
  }

  render() {
    const { isFetching, isError, data } = this.props.data;
    const resultsHeader = (data.length>0) ? <div className="ui header"><h3>Results ({data.length}): </h3></div> : <div></div>;

    const fetchingClass = (isFetching) ? 'loading' : '';
    const listData = data.map((data, index)=>{
      return (
        <div className="ui item" style={{marginBottom: 30}} key={index}>
          <div className="ui form field right action fluid">
            <textarea type="text" rows={5} value={JSON.stringify(data.doc)} readOnly/>
            <div className="ui icon red right floated button" onClick={()=>{this.props.deleteDoc(data.doc._id)}}>
              <i className="remove icon"></i>
              Delete
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="ui container">
          <div className="ui right action input">
            <input id='doctype_input' type="text" placeholder="doc_type"/>
            <div className="ui primary center aligned button" onClick={()=>{this.props.getDocs($('#doctype_input').val())}}>Get Data</div>
          </div>

          {resultsHeader}
          <div className={`ui list ${fetchingClass} center aligned basic segment`} style={{minHeight: '50px'}}>
          {listData}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.documents
  };
}

export default connect(mapStateToProps, {getDocs, deleteDoc})(App);
