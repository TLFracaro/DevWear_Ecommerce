import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./Home/App.js";
import Cadastro from "./Cadastro/index.js";
import CadastroDeProdutos from "./CadastroDeProdutos/index.js";
import GerenciamentoUsuario from "./GerenciamentoUsuario/index.js";
import MenuADM from "./MenuADM/index.js";
import Produtos from "./Produtos/index.js";
import VizualizarProdutos from "./VizualizarProdutos/index.js";
import Login from './Login/index.js';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastrodeprodutos" element={<CadastroDeProdutos />} />
        <Route path="/gerenciamentousuario" element={<GerenciamentoUsuario />} />
        <Route path="/menuadm" element={<MenuADM />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vizualizarprodutos" element={<VizualizarProdutos />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path='/*' element={<NaoEncontrado />} /> */}

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
