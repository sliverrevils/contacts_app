import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";



import './index.scss';
import { store } from './Redux/store';
import Router from './Router';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>      
      <Router/>      
    </Provider>
    </BrowserRouter>    
  </React.StrictMode>
);
