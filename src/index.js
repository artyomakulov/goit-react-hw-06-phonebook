import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import './index.css';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
