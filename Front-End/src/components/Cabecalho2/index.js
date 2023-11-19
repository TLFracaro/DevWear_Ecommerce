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

export default function Cabecalho2(){
    return(
        <section className='Comp-Cabecalho2-Estilo'>
            <header>
                <div class="faixa1">
                    <div class="toolsUsuario">
                        <div class="logoImg">
                            <Link to="/"><img src={devWearLogo}
                                alt="Logo da marca DevWear" /></Link>
                        </div>
                        <div class='ferramentas'>
                        <div class="barraDePesquisa">
                            <input type="text" name="pesquisa" placeholder="Pesquisar"></input>
                            <button><img src={lupaPixel} alt="Lupa clique para pesquisar" /></button>
                        </div>
                        <div class="contato">
                            <button>
                                <img src={balaoMensagem} alt="Balão de contato em arte pixelada" />
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
                                    alt="Pessoa representando o usuário em arte pixelada" /><h1>Minha Conta</h1>
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
                                    alt="Carrinho de compra em arte pixelada" />
                                <h1>Carrinho</h1>
                            </button>
                        </div>
                        </div>
                    </div>
                    <div class="barraDePesquisaCelular">
                        <input type="text" name="pesquisa" placeholder="Pesquisar"></input>
                        <button><img src={lupaPixel} alt="Lupa clique para pesquisar" /></button>
                    </div>
                </div>
            </header>

            <nav>
                <div class="navConteudo">
                    <div class="paginaInicial">

                        <Link to="/menuadm"><svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.91667 28.3333H12.2917V19.5833H21.0417V28.3333H25.4167V15.2083L16.6667 8.64583L7.91667 15.2083V28.3333ZM5 31.25V13.75L16.6667 5L28.3333 13.75V31.25H18.125V22.5H15.2083V31.25H5Z"
                                fill="#898989"/>
                        </svg>
                            Pagina incial</Link>
                    </div>
                    <svg class='barra' xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 3 36" fill="#898989">
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                    </svg>
                    <div class="produto">
                        <Link to="/produtos"><svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_57_283)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.3848 7.71896L4.97879 13.125L7.1342 15.2804L8.28337 13.7463C9.15545 12.584 11.0061 13.2519 10.9332 14.7044L10.36 26.1771C10.3502 26.3744 10.3805 26.5717 10.4491 26.7569C10.5178 26.9421 10.6234 27.1115 10.7595 27.2547C10.8956 27.3979 11.0594 27.5119 11.2409 27.5899C11.4224 27.6679 11.6179 27.7082 11.8155 27.7083H23.1846C23.3822 27.7082 23.5776 27.6679 23.7592 27.5899C23.9407 27.5119 24.1045 27.3979 24.2406 27.2547C24.3767 27.1115 24.4823 26.9421 24.5509 26.7569C24.6196 26.5717 24.6499 26.3744 24.64 26.1771L24.0669 14.7044C23.994 13.2519 25.8446 12.584 26.7167 13.7463L27.8659 15.2804L30.0213 13.125L24.6152 7.71896C24.0625 7.16771 23.2605 7.29167 22.5532 7.29167C22.0413 8.17884 21.3048 8.91551 20.4177 9.42753C19.5306 9.93956 18.5243 10.2089 17.5 10.2083C16.4758 10.2089 15.4695 9.93956 14.5824 9.42753C13.6953 8.91551 12.9588 8.17884 12.4469 7.29167C11.7382 7.29167 10.9361 7.16771 10.3848 7.71896ZM8.32275 5.65688C9.14303 4.83635 10.2556 4.37525 11.4159 4.375H13.2709C13.9592 4.375 14.5425 4.80813 14.773 5.41042C14.9835 5.96319 15.357 6.43894 15.844 6.77462C16.331 7.1103 16.9085 7.29005 17.5 7.29005C18.0915 7.29005 18.6691 7.1103 19.1561 6.77462C19.6431 6.43894 20.0166 5.96319 20.2271 5.41042C20.4575 4.80813 21.0409 4.375 21.7292 4.375H23.5842C24.7439 4.37563 25.8559 4.8367 26.6759 5.65688L32.0834 11.0629C32.6302 11.6099 32.9373 12.3516 32.9373 13.125C32.9373 13.8984 32.6302 14.6401 32.0834 15.1871L29.928 17.3425C29.1696 18.1008 28.1109 18.3473 27.1571 18.1096L27.5538 26.0313C27.5834 26.6234 27.4924 27.2155 27.2862 27.7714C27.08 28.3273 26.763 28.8355 26.3544 29.2651C25.9457 29.6948 25.4541 30.0368 24.9092 30.2706C24.3643 30.5044 23.7775 30.625 23.1846 30.625H11.8155C11.2225 30.625 10.6358 30.5044 10.0909 30.2706C9.54602 30.0368 9.05433 29.6948 8.6457 29.2651C8.23708 28.8355 7.92004 28.3273 7.71386 27.7714C7.50768 27.2155 7.41664 26.6234 7.44629 26.0313L7.84295 18.1096C7.35421 18.2325 6.84192 18.2265 6.35622 18.092C5.87052 17.9575 5.42805 17.6993 5.07212 17.3425L2.9167 15.1871C2.36991 14.6401 2.06274 13.8984 2.06274 13.125C2.06274 12.3516 2.36991 11.6099 2.9167 11.0629L8.32275 5.65688Z"
                                    fill="#898989" />
                            </g>
                            <defs>
                                <clipPath id="clip0_57_283">
                                    <rect width="35" height="35" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                            Produtos</Link>
                    </div>
                    <svg class='barra' xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 3 36" fill="#898989">
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                    </svg>
                    <div class="gerenUsuario">
                        <Link to="/gerenciamentousuario"><svg width="30" height="35" viewBox="0 0 30 35"
                            fill="898989" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.2 21.3364C18.5344 21.3364 17.7335 22.3015 15 22.3015C12.2665 22.3015 11.4714 21.3364 9.8 21.3364C5.49375 21.3364 2 24.9675 2 29.443V30.9871C2 32.5855 3.24777 33.8824 4.78571 33.8824H25.2143C26.7522 33.8824 28 32.5855 28 30.9871V29.443C28 24.9675 24.5062 21.3364 20.2 21.3364ZM25.2143 30.9871H4.78571V29.443C4.78571 26.5719 7.0375 24.2316 9.8 24.2316C10.6473 24.2316 12.0228 25.1967 15 25.1967C18.0004 25.1967 19.3469 24.2316 20.2 24.2316C22.9625 24.2316 25.2143 26.5719 25.2143 29.443V30.9871ZM15 20.3713C19.6138 20.3713 23.3571 16.4809 23.3571 11.6857C23.3571 6.89045 19.6138 3 15 3C10.3862 3 6.64286 6.89045 6.64286 11.6857C6.64286 16.4809 10.3862 20.3713 15 20.3713ZM15 5.89522C18.0701 5.89522 20.5714 8.49489 20.5714 11.6857C20.5714 14.8764 18.0701 17.4761 15 17.4761C11.9299 17.4761 9.42857 14.8764 9.42857 11.6857C9.42857 8.49489 11.9299 5.89522 15 5.89522Z"
                                fill="898989" />
                        </svg>
                            Gerenciamento de Usuário</Link>
                    </div>
                </div>
            </nav>
        </section>
    );
}