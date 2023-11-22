import Cabecalho2 from "../../components/Cabecalho2";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";

import '../../css/global.css';
import Rodape from "../../components/Rodape";
import api from "../../api";
import { useEffect, useState } from "react";

export default function VizualizarProdutos() {
    const location = useLocation();
    const sku = location.state || {};
    const [produto, setProduto] = useState({});
    const [imagensBase64, setImagemBase64] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let r = await api.get(`/produto/${sku}`);
                setProduto(r.data);

                const imagensBase64 = r.data.imagens.map((imagem) => {
                    return imagem.imagem_base64;
                });

                console.log('Dados do Produto:', r.data);
                console.log('Imagens Base64:', imagensBase64);

                setImagemBase64(imagensBase64);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [sku]);

    const calcularGrid = () => {
        const numeroDeImagens = imagensBase64.length;
        const colunas = numeroDeImagens === 4 ? 2 : 1; 
        const linhas = Math.ceil(numeroDeImagens / colunas);
    
        return {
          gridTemplateColumns: `repeat(${colunas}, 1fr)`,
          gridTemplateRows: `repeat(${linhas}, 1fr)`,
        };
      };

    const dataDeInclusao = new Date(produto.item?.dataDeInclusao);

    const addZero = (num) => (num < 10 ? `0${num}` : num);

    const dia = addZero(dataDeInclusao.getDate());
    const mes = addZero(dataDeInclusao.getMonth() + 1);
    const ano = dataDeInclusao.getFullYear();
    const horas = addZero(dataDeInclusao.getHours());
    const minutos = addZero(dataDeInclusao.getMinutes());

    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

    return (
        <section className="VizualizarProdutoEstilo">
            <Cabecalho2 />

            <main>
                <div className="mainConteudo">
                    <div className="voltar">
                        <Link to="/produtos">
                            <h1><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3794 31.5L15.9375 24L23.3794 16.5M16.9716 24H32.0625" stroke="black"
                                    strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M42 24C42 14.0625 33.9375 6 24 6C14.0625 6 6 14.0625 6 24C6 33.9375 14.0625 42 24 42C33.9375 42 42 33.9375 42 24Z"
                                    stroke="black" strokeWidth="4" stroke-miterlimit="10" />
                            </svg>
                                Voltar</h1>
                        </Link>
                    </div>
                    <h1 id="titulo">• Informações do produto:</h1>
                    <div className="conteudo">
                        <div className="imagens" style={calcularGrid()}>
                            {imagensBase64.map((imagemBase64, index) => (
                                <div key={index}>
                                    {imagemBase64 && imagemBase64.toLowerCase().includes('image/png') ? (
                                        <img
                                            src={imagemBase64}
                                            alt={`Imagem ${index + 1}`}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <p>Imagem não suportada</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="infos">
                            <div>
                                <h4>Nome:⠀<p>{produto.item?.nome}</p></h4>
                            </div>
                            <h4>Categoria:⠀<p>{produto.item?.categoria}</p></h4>
                            <h4>Marca:⠀<p>{produto.item?.marca}</p></h4>
                            <h4>Preço:⠀<p>{produto.item?.preco}</p></h4>
                            <h4>Descrição do produto:⠀<p>{produto.item?.descricao}</p></h4>
                            <h4>SKU:⠀<p>{produto.item?.sku}</p></h4>
                            <h4>Localização no estoque:⠀<p>{produto.item?.loc_estoque}</p></h4>
                            <h4>Data de inclusão:⠀<p>{dataFormatada}</p></h4>
                            <div className="variacoes">
                                <h4>Variações:</h4>
                                <table>
                                    <tr>
                                        <th>Tamanho</th>
                                        <th>Cor</th>
                                        <th>Quantidade</th>
                                    </tr>
                                    {produto.variacao?.map((variacao) => (
                                        <tr className='Conteudo'>
                                            <td className="primeiro">Tamanho: {variacao.tamanho}</td>
                                            <td>Cor: {variacao.cor}</td>
                                            <td className="final">Quantidade: {variacao.quantidade}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}