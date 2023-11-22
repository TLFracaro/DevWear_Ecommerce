import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./pages/Home/App.js";
import Cadastro from "./pages/Cadastro/index.js";
import CadastroDeProdutos from "./pages/CadastroDeProdutos/index.js";
import GerenciamentoUsuario from "./pages/GerenciamentoUsuario/index.js";
import Menu from "./pages/Menu/index.js";
import Produtos from "./pages/Produtos/index.js";
import VizualizarProdutos from "./pages/VizualizarProdutos/index.js";
import Login from './pages/Login/index.js';
import Alterar from './pages/AlterarProduto/index.js';

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/cadastrodeprodutos" element={<CadastroDeProdutos />} />
                <Route path="/gerenciamentousuario" element={<GerenciamentoUsuario />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/vizualizarprodutos" element={<VizualizarProdutos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/alterarproduto" element={<Alterar />} />
                {/* <Route path='/*' element={<NaoEncontrado />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

