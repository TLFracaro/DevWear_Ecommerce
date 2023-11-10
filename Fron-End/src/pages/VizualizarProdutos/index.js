import Cabecalho2 from "../../components/Cabecalho2";
import "./index.scss";
import { Link } from "react-router-dom";

import '../../css/global.css';
import Rodape from "../../components/Rodape";

export default function VizualizarProdutos(sku) {

    return (
        <section className="VizualizarProdutoEstilo">
            <Cabecalho2 />

            <main>
                <div class="mainConteudo">
                    <div class="voltar">
                        <Link to="/produtos">
                            <h1><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3794 31.5L15.9375 24L23.3794 16.5M16.9716 24H32.0625" stroke="black"
                                    stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M42 24C42 14.0625 33.9375 6 24 6C14.0625 6 6 14.0625 6 24C6 33.9375 14.0625 42 24 42C33.9375 42 42 33.9375 42 24Z"
                                    stroke="black" stroke-width="4" stroke-miterlimit="10" />
                            </svg>
                                Voltar</h1>
                        </Link>
                    </div>
                    <h1 id="titulo">• Informações do produto:</h1>
                    <div class="conteudo">
                        <div class="imagens">
                            <img src="" alt=""></img>
                            <img src="" alt=""></img>
                            <img src="" alt=""></img>
                            <img src="" alt=""></img>
                            <img src="" alt=""></img>
                        </div>
                        <div class="infos">
                            <h4>Nome: <p></p></h4>
                            <h4>Categoria: <p></p></h4>
                            <h4>Marca: <p></p></h4>
                            <h4>Variação: <p></p></h4>
                            <h4>Preço: <p></p></h4>
                            <h4>Descrição do produto: <p></p></h4>
                            <h4>Quantidade em estoque: <p></p></h4>
                            <h4>SKU: <p></p></h4>
                            <h4>Localização no estoque: <p></p></h4>
                            <h4>Histórico de vendas: <p></p></h4>
                            <h4>Data de inclusão: <p></p></h4>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}