import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { UserDetailsContextProvider } from './components/UserDetailsContextProvider';
import { BrowserRouter } from 'react-router-dom'
// import reportWebVitals from './reportWebVitals';
// import './tailwind.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <UserDetailsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserDetailsContextProvider>
  // </React.StrictMode>
);


