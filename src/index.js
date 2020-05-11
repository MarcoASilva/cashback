import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as dotEnv from 'dotenv-yaml';

dotEnv.config();

switch (process.env.NODE_ENV) {
  case 'dev':
    dotEnv.config({ path: './.dev.env.yml' });
    break;
  default:
    break;
}

console.log(process.env);
console.log(process.env.GLOBAL);
console.log(process.env.REACT_APP_GLOBAL);
console.log(process.env.REACT_APP_TESTE);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
