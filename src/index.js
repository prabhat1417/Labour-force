import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <Toaster />
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
)