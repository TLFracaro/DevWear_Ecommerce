import "./index.scss"
import Cabecalho2 from "../../components/Cabecalho2";

import '../../css/global.css';  

export default function GerenciamentoUsuario() {
    return (
        <section className="GerenciamentoUsuarioEstilo">
            <Cabecalho2 />   

            <main>
                <div class="mainConteudo">
                    <div class="titulo">
                        <h1>Gerenciamento de usuários</h1>
                    </div>
                    <div class="busca">
                        <div class="pesquisa">
                            <input type="text" placeholder="Pesquisar por: nome ou e-mail"></input>
                            <img src="/assets/image/lupa.svg" alt=""></img>
                        </div>
                    </div>
                    <div class="tabelaUsuario">
                        <table>
                            <tr>
                                <th>Nome usuario</th>
                                <th>E-mail</th>
                                <th>Permição</th>
                            </tr>
                            <tr class="linha">
                                <td class="primeiro">Camisa java</td>
                                <td>T-Shirt</td>
                                <td class="final"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 10C12.525 10 14.5714 7.98555 14.5714 5.5C14.5714 3.01445 12.525 1 10 1C7.475 1 5.42857 3.01445 5.42857 5.5C5.42857 7.98555 7.475 10 10 10ZM13.4214 11.1461L11.7143 17.875L10.5714 13.0938L11.7143 11.125H8.28571L9.42857 13.0938L8.28571 17.875L6.57857 11.1461C4.03214 11.2656 2 13.3152 2 15.85V17.3125C2 18.2441 2.76786 19 3.71429 19H16.2857C17.2321 19 18 18.2441 18 17.3125V15.85C18 13.3152 15.9679 11.2656 13.4214 11.1461Z"
                                        fill="black" />
                                </svg>
                                </td>
                            </tr>
                            <tr class="linha">
                                <td class="primeiro">Camisa java</td>
                                <td>T-Shirt</td>
                                <td class="final"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2 11.6875C12.175 11.6875 11.6822 12.25 10 12.25C8.31785 12.25 7.82855 11.6875 6.8 11.6875C4.15 11.6875 2 13.8039 2 16.4125V17.3125C2 18.2441 2.76786 19 3.71428 19H16.2857C17.2321 19 18 18.2441 18 17.3125V16.4125C18 13.8039 15.85 11.6875 13.2 11.6875ZM16.2857 17.3125H3.71428V16.4125C3.71428 14.739 5.1 13.375 6.8 13.375C7.32142 13.375 8.16788 13.9375 10 13.9375C11.8464 13.9375 12.675 13.375 13.2 13.375C14.9 13.375 16.2857 14.739 16.2857 16.4125V17.3125ZM10 11.125C12.8393 11.125 15.1428 8.85743 15.1428 6.06251C15.1428 3.26757 12.8393 1 10 1C7.16074 1 4.85714 3.26757 4.85714 6.06251C4.85714 8.85743 7.16074 11.125 10 11.125ZM10 2.6875C11.8893 2.6875 13.4286 4.20273 13.4286 6.06251C13.4286 7.92223 11.8893 9.43749 10 9.43749C8.11071 9.43749 6.57143 7.92223 6.57143 6.06251C6.57143 4.20273 8.11071 2.6875 10 2.6875Z" fill="black" />
                                </svg>
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </main>
        </section>
    );
}