import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './redux/store/configureStore';

const store = configureStore();
persistStore(store, {storage: localForage});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
