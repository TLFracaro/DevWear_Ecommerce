import './index.scss';

import { Link } from 'react-router-dom';

import balaoMensagem from '../../assets/image/balaoMensagem.svg';
import carrinhoPixel from '../../assets/image/carrinhoPixel.svg';
import categoria from '../../assets/image/categoria.svg';
import devWearLogo from '../../assets/image/devWearLogo.svg';
import lupaPixel from '../../assets/image/lupaPixel.svg';
import pessoaPixel from '../../assets/image/pessoaPixel.svg';
import seta from '../../assets/image/seta.svg';

import '../../css/global.css';

export default function Cabecalho1(){
    return(
        <section className='Comp-Cabecalho1-Estilo'>
            <header>
                <div class="faixa1">
                    <div class="logoImg">
                        <Link to="/"><img src={devWearLogo}
                            alt="Logo da marca DevWear"/></Link>
                    </div>
                    <div class="barraDePesquisa">
                        <input type="text" name="pesquisa" placeholder="Pesquisar"></input>
                        <button><img src={lupaPixel} alt="Lupa clique para pesquisar"/></button>
                    </div>
                    <div class="toolsUsuario">
                        <div class="contato">
                            <button>
                                <img src={balaoMensagem} alt="Balão de contato em arte pixelada"/>
                                <h1>Contato</h1>
                            </button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <div class="contaUsuario">
                            <Link to="/login">
                                <img src={pessoaPixel}
                                    alt="Pessoa representando o usuário em arte pixelada"/><h1>Minha Conta</h1>
                            </Link>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <div class="carrinho">
                            <button>
                                <img src={carrinhoPixel}
                                    alt="Carrinho de compra em arte pixelada"/>
                                <h1>Carrinho</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <div class="navegacaoCategoria">
                    <div class="maisCategorias">
                        <button><img src={categoria}
                            alt="Icone de mostrar mais categorias"/>categorias</button>
                    </div>
                    <div class="principal">
                        <button>Camisetas
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>

                        <button>Acessorios
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <button>Moletom
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <button>Calcas
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <button>Bermudas
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <button>Mais Categorias
                            <img class="seta" src={seta}
                                alt="Seta para mostrar subcategorias"/></button>
                    </div>
                </div>
            </nav>
        </section>
    );
}