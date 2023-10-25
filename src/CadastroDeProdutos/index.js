import "./index.scss";
import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import devWearLogo from '../assets/image/devWearLogo.svg';
import pessoaPixel from '../assets/image/pessoaPixel.svg';
import sino from '../assets/image/sino.svg';

import '../css/global.css';

export default function CadastroDeProdutos() {
    const [images, setImages] = useState([]);

    function addImage(event) {
        const selectedFiles = event.target.files;
        const newImages = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            newImages.push(URL.createObjectURL(file));
        }

        setImages([...images, ...newImages]);
    }

    function deleteImage(index) {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    function adicionarVariacao() {
        const adicionarVariacao = document.querySelector("#adicionar-variacao");
        const variacoesContainer = document.querySelector(".variacoes");

        adicionarVariacao.addEventListener("click", () => {
            const novaVariacao = document.createElement("div");

            novaVariacao.innerHTML = `
                                    <label for="tamanho">Tamanho:</label>
                                    <input id="tamanho" type="text" name="tamanho">
                                    <label for="cor">Cor:</label>
                                    <input id="cor" type="text" name="cor">
                                    <label for="quantidade">Quantidade:</label>
                                    <input id="quantidade" type="text" name="quantidade">
                                `;

            variacoesContainer.appendChild(novaVariacao);
        });
    }

    return (
        <section className="CadastroProdutoEstilo">
            <header>
                <div class="cabecalhoConteudo">
                    <div class="logo">
                        <Link to="/"><img src={devWearLogo}
                            alt="Logo da marca DevWear"></img></Link>
                    </div>
                    <div class="toolsUsuario">
                        <div class="aviso">
                            <a><img src={sino} alt="Sino de avisos"></img>avisos</a>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="36" viewBox="0 0 3 36" fill="none">
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect x="1" width="1" height="36" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                            <rect y="1" width="3" height="34" fill="white" />
                        </svg>
                        <div class="minhaConta">
                            <a><img src={pessoaPixel}
                                alt="Pessoa sinalizando minha conta"></img>minha conta</a>
                        </div>
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
                                fill="#898989" />
                        </svg>
                            Pagina incial</Link>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 3 36" fill="#898989">
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
                                    fill="#000" />
                            </g>
                            <defs>
                                <clipPath id="clip0_57_283">
                                    <rect width="35" height="35" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                            Produtos</Link>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 3 36" fill="#898989">
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect x="1" width="1" height="36" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                        <rect y="1" width="3" height="34" fill="898989" />
                    </svg>
                    <div class="gerenUsuario">
                        <Link to="/gerenciamentousuario"><svg width="30" height="35" viewBox="0 0 30 35"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.2 21.3364C18.5344 21.3364 17.7335 22.3015 15 22.3015C12.2665 22.3015 11.4714 21.3364 9.8 21.3364C5.49375 21.3364 2 24.9675 2 29.443V30.9871C2 32.5855 3.24777 33.8824 4.78571 33.8824H25.2143C26.7522 33.8824 28 32.5855 28 30.9871V29.443C28 24.9675 24.5062 21.3364 20.2 21.3364ZM25.2143 30.9871H4.78571V29.443C4.78571 26.5719 7.0375 24.2316 9.8 24.2316C10.6473 24.2316 12.0228 25.1967 15 25.1967C18.0004 25.1967 19.3469 24.2316 20.2 24.2316C22.9625 24.2316 25.2143 26.5719 25.2143 29.443V30.9871ZM15 20.3713C19.6138 20.3713 23.3571 16.4809 23.3571 11.6857C23.3571 6.89045 19.6138 3 15 3C10.3862 3 6.64286 6.89045 6.64286 11.6857C6.64286 16.4809 10.3862 20.3713 15 20.3713ZM15 5.89522C18.0701 5.89522 20.5714 8.49489 20.5714 11.6857C20.5714 14.8764 18.0701 17.4761 15 17.4761C11.9299 17.4761 9.42857 14.8764 9.42857 11.6857C9.42857 8.49489 11.9299 5.89522 15 5.89522Z"
                                fill="898989" />
                        </svg>
                            Gerenciamento de Usuário</Link>
                    </div>
                </div>
            </nav>

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
                    <h1 id="titulo">• Adicionar produto:</h1>

                    <div class="formulario">
                        <form method="post" action="">
                            <input type="hidden" name="flag" value="cad_prod"></input>

                            <label for="nomeProd">Nome do produto:*</label>
                            <input id="nomeProd" type="text" name="nomeProd"></input>

                            <label for="categoria">Categoria:*</label>
                            <input id="categoria" type="text" name="categoria"></input>

                            <label for="marca">Marca:*</label>
                            <input id="marca" type="text" name="marca"></input>

                            <label for="preco">Preço:*</label>
                            <input id="preco" type="number" name="preco"></input>

                            <label for="descricao">Descrição:*</label>
                            <input id="descricao" type="text" name="descricao"></input>

                            <label for="sku">SKU:*</label>
                            <input id="sku" type="text" name="sku"></input>

                            <label for="locEstoque">Locação de estoque:</label>
                            <input id="locEstoque" type="text" name="locEstoque"></input>

                            <label for="peso">Peso:*</label>
                            <input id="peso" type="number" name="peso"></input>

                            <label for="imagem">• Imagem:*</label>
                            <div className="imagemProd">
                                <input type="file" id="imageInput" accept="image/*" multiple onChange={addImage} />
                                <div id="imageContainer">
                                    {images.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image} alt={`Imagem ${index}`} />
                                            <button onClick={() => deleteImage(index)}><svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 6.66667V5C15 4.55797 15.1756 4.13405 15.4882 3.82149C15.8007 3.50893 16.2246 3.33333 16.6667 3.33333H23.3333C23.7754 3.33333 24.1993 3.50893 24.5118 3.82149C24.8244 4.13405 25 4.55797 25 5V6.66667H31.6667C32.5507 6.66667 33.3986 7.01785 34.0237 7.64298C34.6488 8.2681 35 9.11594 35 10V11.6667C35 12.5507 34.6488 13.3986 34.0237 14.0237C33.3986 14.6488 32.5507 15 31.6667 15H31.445L30.3117 32C30.2271 33.2655 29.6648 34.4515 28.7386 35.318C27.8125 36.1844 26.5916 36.6665 25.3233 36.6667H14.71C13.4428 36.6666 12.2229 36.1855 11.2968 35.3204C10.3708 34.4553 9.80784 33.2709 9.72167 32.0067L8.56167 15H8.33333C7.44928 15 6.60143 14.6488 5.97631 14.0237C5.35119 13.3986 5 12.5507 5 11.6667V10C5 9.11594 5.35119 8.2681 5.97631 7.64298C6.60143 7.01785 7.44928 6.66667 8.33333 6.66667H15ZM31.6667 10H8.33333V11.6667H31.6667V10ZM11.9017 15L13.0467 31.78C13.0754 32.2015 13.2631 32.5964 13.5719 32.8848C13.8807 33.1731 14.2875 33.3335 14.71 33.3333H25.3233C25.7464 33.3334 26.1536 33.1726 26.4625 32.8835C26.7714 32.5945 26.9587 32.1988 26.9867 31.7767L28.1033 15H11.9033H11.9017ZM16.6667 16.6667C17.1087 16.6667 17.5326 16.8423 17.8452 17.1548C18.1577 17.4674 18.3333 17.8913 18.3333 18.3333V30C18.3333 30.442 18.1577 30.8659 17.8452 31.1785C17.5326 31.4911 17.1087 31.6667 16.6667 31.6667C16.2246 31.6667 15.8007 31.4911 15.4882 31.1785C15.1756 30.8659 15 30.442 15 30V18.3333C15 17.8913 15.1756 17.4674 15.4882 17.1548C15.8007 16.8423 16.2246 16.6667 16.6667 16.6667ZM23.3333 16.6667C23.7754 16.6667 24.1993 16.8423 24.5118 17.1548C24.8244 17.4674 25 17.8913 25 18.3333V30C25 30.442 24.8244 30.8659 24.5118 31.1785C24.1993 31.4911 23.7754 31.6667 23.3333 31.6667C22.8913 31.6667 22.4674 31.4911 22.1548 31.1785C21.8423 30.8659 21.6667 30.442 21.6667 30V18.3333C21.6667 17.8913 21.8423 17.4674 22.1548 17.1548C22.4674 16.8423 22.8913 16.6667 23.3333 16.6667Z"
                                                fill="#fff" />
                                        </svg></button>
                                        </div>
                                    ))}
                                    
                                </div>
                                <label htmlFor="imageInput">
                                    <span>
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="60" height="60" rx="20" fill="white" />
                                            <path
                                                d="M15 5C20.5138 5 25 9.48625 25 15C25 20.5138 20.5138 25 15 25C9.48625 25 5 20.5138 5 15C5 9.48625 9.48625 5 15 5ZM15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9037 8.09625 27.5 15 27.5C21.9037 27.5 27.5 21.9037 27.5 15C27.5 8.09625 21.9037 2.5 15 2.5ZM21.25 13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25H16.25V16.25H21.25V13.75Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </span>
                                </label>
                            </div>

                            <label for="variacao">• Variação:*</label>

                            <div class="variacao">
                                <label for="tamanho">Tamanho:</label>
                                <input id="tamanho" type="text" name="tamanho"></input>
                                <label for="cor">Cor:</label>
                                <input id="cor" type="text" name="cor"></input>
                                <label for="quantidade">Quantidade:</label>
                                <input id="quantidade" type="text" name="quantidade"></input>
                                <a><svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 6.66683V5.00016C15 4.55814 15.1756 4.13421 15.4882 3.82165C15.8007 3.50909 16.2246 3.3335 16.6667 3.3335H23.3333C23.7754 3.3335 24.1993 3.50909 24.5118 3.82165C24.8244 4.13421 25 4.55814 25 5.00016V6.66683H31.6667C32.5507 6.66683 33.3986 7.01802 34.0237 7.64314C34.6488 8.26826 35 9.11611 35 10.0002V11.6668C35 12.5509 34.6488 13.3987 34.0237 14.0239C33.3986 14.649 32.5507 15.0002 31.6667 15.0002H31.445L30.3117 32.0002C30.2271 33.2656 29.6648 34.4517 28.7386 35.3181C27.8125 36.1846 26.5916 36.6667 25.3233 36.6668H14.71C13.4428 36.6668 12.2229 36.1856 11.2968 35.3206C10.3708 34.4555 9.80784 33.2711 9.72167 32.0068L8.56167 15.0002H8.33333C7.44928 15.0002 6.60143 14.649 5.97631 14.0239C5.35119 13.3987 5 12.5509 5 11.6668V10.0002C5 9.11611 5.35119 8.26826 5.97631 7.64314C6.60143 7.01802 7.44928 6.66683 8.33333 6.66683H15ZM31.6667 10.0002H8.33333V11.6668H31.6667V10.0002ZM11.9017 15.0002L13.0467 31.7802C13.0754 32.2017 13.2631 32.5966 13.5719 32.8849C13.8807 33.1733 14.2875 33.3336 14.71 33.3335H25.3233C25.7464 33.3336 26.1536 33.1728 26.4625 32.8837C26.7714 32.5946 26.9587 32.1989 26.9867 31.7768L28.1033 15.0002H11.9033H11.9017ZM16.6667 16.6668C17.1087 16.6668 17.5326 16.8424 17.8452 17.155C18.1577 17.4675 18.3333 17.8915 18.3333 18.3335V30.0002C18.3333 30.4422 18.1577 30.8661 17.8452 31.1787C17.5326 31.4912 17.1087 31.6668 16.6667 31.6668C16.2246 31.6668 15.8007 31.4912 15.4882 31.1787C15.1756 30.8661 15 30.4422 15 30.0002V18.3335C15 17.8915 15.1756 17.4675 15.4882 17.155C15.8007 16.8424 16.2246 16.6668 16.6667 16.6668ZM23.3333 16.6668C23.7754 16.6668 24.1993 16.8424 24.5118 17.155C24.8244 17.4675 25 17.8915 25 18.3335V30.0002C25 30.4422 24.8244 30.8661 24.5118 31.1787C24.1993 31.4912 23.7754 31.6668 23.3333 31.6668C22.8913 31.6668 22.4674 31.4912 22.1548 31.1787C21.8423 30.8661 21.6667 30.4422 21.6667 30.0002V18.3335C21.6667 17.8915 21.8423 17.4675 22.1548 17.155C22.4674 16.8424 22.8913 16.6668 23.3333 16.6668Z"
                                        fill="#898989" />
                                </svg>
                                </a>
                            </div>

                            <button id="adicionar-variacao"><svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 5C20.5138 5 25 9.48625 25 15C25 20.5138 20.5138 25 15 25C9.48625 25 5 20.5138 5 15C5 9.48625 9.48625 5 15 5ZM15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9037 8.09625 27.5 15 27.5C21.9037 27.5 27.5 21.9037 27.5 15C27.5 8.09625 21.9037 2.5 15 2.5ZM21.25 13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25H16.25V16.25H21.25V13.75Z"
                                    fill="black" />
                            </svg>
                                Adicionar Variação</button>

                            <input type="submit" value="CADASTRAR"></input>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
}