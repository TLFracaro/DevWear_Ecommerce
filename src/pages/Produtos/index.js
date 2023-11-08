import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import lupa from '../../assets/image/lupa.svg';
import Cabecalho2 from "../../components/Cabecalho2";

import '../../css/global.css';
import Rodape from "../../components/Rodape";
import axios from "axios";
import LinhaProduto from "../../components/LinhaProduto";
import { useEffect, useState } from "react";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const navigate = useNavigate();

    async function excluirProduto(sku) {
        let r = await axios.delete('http://localhost:5000/produto/excluir/' + sku);
        listarProduto();
    }

    async function vizualizarproduto(sku) {
        navigate("/vizualizarprodutos")
    }

    async function alterarproduto(sku) {
        let r = await axios.put('http://localhost:5000/produto/alterar/' + sku);
        navigate("/alterarproduto", r);
    }

    async function listarProduto() {
        let r = await axios.get('http://localhost:5000/produto/listar/');
        let produtos = r.data;

        setProdutos(produtos);
    }

    const filtrarProdutos = () => {
        return produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            produto.categoria.toLowerCase().includes(termoPesquisa.toLowerCase())
        );
    };

    useEffect(() => {

        listarProduto();

    }, [])

    return (
        <section className="ProdutoEstilo">

            <Cabecalho2 />

            <main>
                <div class="mainConteudo">
                    <div class="titulo">
                        <h1>Produtos</h1>
                    </div>
                    <div class="buscaEcadastro">
                        <div class="pesquisa">
                            <input
                                type="text"
                                placeholder="Pesquisar por: categoria ou nome"
                                value={termoPesquisa}
                                onChange={(e) => setTermoPesquisa(e.target.value)}
                            />
                            <img src={lupa} alt=""></img>
                        </div>

                        <Link to="/cadastrodeprodutos"><svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_57_593)">
                                <path
                                    d="M18.7 15.3H25.5V18.7H18.7V25.5H15.3V18.7H8.5V15.3H15.3V8.5H18.7V15.3ZM17 34C12.4913 34 8.1673 32.2089 4.97918 29.0208C1.79107 25.8327 0 21.5087 0 17C0 12.4913 1.79107 8.1673 4.97918 4.97918C8.1673 1.79107 12.4913 0 17 0C21.5087 0 25.8327 1.79107 29.0208 4.97918C32.2089 8.1673 34 12.4913 34 17C34 21.5087 32.2089 25.8327 29.0208 29.0208C25.8327 32.2089 21.5087 34 17 34ZM17 30.6C20.6069 30.6 24.0662 29.1671 26.6167 26.6167C29.1671 24.0662 30.6 20.6069 30.6 17C30.6 13.3931 29.1671 9.93384 26.6167 7.38335C24.0662 4.83285 20.6069 3.4 17 3.4C13.3931 3.4 9.93384 4.83285 7.38335 7.38335C4.83285 9.93384 3.4 13.3931 3.4 17C3.4 20.6069 4.83285 24.0662 7.38335 26.6167C9.93384 29.1671 13.3931 30.6 17 30.6Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_57_593">
                                    <rect width="34" height="34" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                            Adicionar produto</Link>
                    </div>
                    <div class="tabelaProduto">
                        { filtrarProdutos().length === 0 ? (
                            <p>Nenhum produto encontrado com esse nome e categoria =&#40;</p>
                        ) : (
                            <table>
                                {filtrarProdutos().map((produto) => (
                                    <LinhaProduto
                                        key={produto.sku}
                                        nome={produto.nome}
                                        categoria={produto.categoria}
                                        preco={produto.preco}
                                        sku={produto.sku}
                                        remover={() => excluirProduto(produto.sku)}
                                        vizualizar={() => vizualizarproduto(produto.sku)}
                                        alterar={() => alterarproduto(produto.sku)}
                                    />
                                ))}
                            </table>
                        )}
                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}