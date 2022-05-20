import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootProvider from 'providers/root.provider';
import { BrowserRouter } from 'react-router-dom';
import ManageVersionChange from 'components/ManageVersionChange/ManageVersionChange.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
