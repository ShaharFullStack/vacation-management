import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Components/LayoutArea/Layout/Layout';
import './index.css';
import { store } from './Redux/Store';
import reportWebVitals from './reportWebVitals';
import React from 'react';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // Context tunneling
    <Provider store={store}>
        <BrowserRouter>
                    <Layout />
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
