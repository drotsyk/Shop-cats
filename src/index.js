import React from 'react';
import ReactDOM from 'react-dom';
import {Storage} from './App/Storage'
import './App/style.css'
import {  HashRouter } from 'react-router-dom';


ReactDOM.render(
  <HashRouter >
    <Storage />
  </HashRouter>,
  document.getElementById('root')
);
