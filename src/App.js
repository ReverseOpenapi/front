import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mcd from "./mcd/pages/Mcd";
import Form from "./form/pages/Form";
import Home from "./Home";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Mcd" element={<Mcd/>} />
            <Route exact path="/Form" element={<Form/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
