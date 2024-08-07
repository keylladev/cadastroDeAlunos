import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Sobre from './components/sobre/Sobre';
import Alunos from './components/alunos/Alunos';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaReact } from "react-icons/fa6";
import './App.css';


function App() {
  return (
    <div className="App">      
      <h1>Escola Interativa</h1>   
      <BrowserRouter>
        <Nav variant='tabs'>
          <Nav.Link as={Link} to='/'>Página Inicial</Nav.Link>
          <Nav.Link as={Link} to='/alunos'>Cadastro de Alunos</Nav.Link>
          <Nav.Link as={Link} to='/sobre'>Sobre</Nav.Link>
        </Nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/alunos' element={<Alunos />} />
          <Route path='/sobre' element={<Sobre />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
