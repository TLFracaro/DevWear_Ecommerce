import "./index.scss"
import Cabecalho2 from "../../components/Cabecalho2";
import React, { useState } from 'react';
import '../../css/global.css';
import Rodape from "../../components/Rodape";

export default function GerenciamentoUsuario() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = () => {
        fetch(/usuario/pesquisar/${searchQuery})
            .then(response => response.json())
            .then(data => {
                console.log('Resultado da pesquisa:', data);
                setSearchResults(data);
            })
            .catch(error => console.error(error));
    }
    return (
        <section className="GerenciamentoUsuarioEstilo">
            <Cabecalho2 />

            <main>
                <div className="mainConteudo">
                    <div className="titulo">
                        <h1>Gerenciamento de usuários</h1>
                    </div>
                    <div className="busca">
                        <div className="pesquisa">
                            <input type="text" placeholder="Pesquisar por CPF" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button onClick={handleSearch}>
                                <img src="/assets/image/lupa.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="tabelaUsuario">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Nome usuário</th>
                                    <th>E-mail</th>
                                    <th>Permissão</th>
                                </tr>
                                {searchResults.length > 0 ? (
                                    searchResults.map((result, index) => (
                                        <tr key={index} className="linha">
                                            <td className="primeiro">{result.nome}</td>
                                            <td>{result.email}</td>
                                            <td className="final">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 10C12.525 10 14.5714 7.98555 14.5714 5.5C14.5714 3.01445 12.525 1 10 1C7.475 1 5.42857 3.01445 5.42857 5.5C5.42857 7.98555 7.475 10 10 10ZM13.4214 11.1461L11.7143 17.875L10.5714 13.0938L11.7143 11.125H8.28571L9.42857 13.0938L8.28571 17.875L6.57857 11.1461C4.03214 11.2656 2 13.3152 2 15.85V17.3125C2 18.2441 2.76786 19 3.71429 19H16.2857C17.2321 19 18 18.2441 18 17.3125V15.85C18 13.3152 15.9679 11.2656 13.4214 11.1461Z" fill="black" />
                                                </svg>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">{searchQuery ? 'Usuário não encontrado' : 'Digite um CPF para pesquisar'}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>

            <Rodape />

        </section>
    );
}