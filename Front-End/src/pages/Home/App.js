import "./App.scss"
import cartaz1 from '../../assets/image/cartaz1.svg';
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";

import '../../css/global.css';
import Produto_Exibir from "../../components/Produto_Exibir";
import api from "../../api";
import { useEffect, useState } from "react";

export default function Home() {
    const [produto, setProduto] = useState([]);

    // async function listarProduto() {
    //     try {
    //         let r = await api.get('/produto/imagem');
    //         let produtos = r.data;
    //         console.log(produtos);
    //         setProduto(produtos);
    //     } catch (error) {
    //         console.error('Erro ao listar produtos:', error);
    //     }
    // }    

    // useEffect(() => {
    //     listarProduto();
    // }, []);
    

    return (
        <section class="HomeEstilo">

            <Cabecalho1 />

            <main>
                <div class='conteudoMain'>
                    <div class='faixa1'>
                        <img src={cartaz1} alt="" />
                    </div>
                    <div class='produtosExibir'>
                        <h2>Nossos produtos:</h2>
                        {produto && produto.map((produtos) => (
                            <Produto_Exibir imagem={''} nomeProd={produtos.nome} preco={produtos.preco} />
                        ))}

                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}