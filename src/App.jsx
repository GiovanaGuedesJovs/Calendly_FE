import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes.jsx";
import React from 'react';

import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
      
  );

 


