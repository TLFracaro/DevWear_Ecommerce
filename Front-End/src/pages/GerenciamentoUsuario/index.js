import "./index.scss"
import Cabecalho2 from "../../components/Cabecalho2";

import '../../css/global.css';
import Rodape from "../../components/Rodape";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";

export default function GerenciamentoUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [texto, setTexto] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    let caixaDeDialogo = document.getElementById("CaixaDeDialogo");

    const fecharModal = () => {
        caixaDeDialogo.close();
    };

    const mostrarModal = () => {
        caixaDeDialogo.showModal();
    };

    async function listarUsuarios() {
        let r = await api.get('/usuario/listar/');
        let usuarios = r.data;
        setUsuarios(usuarios);
    }

    const filtrarUsuarios = () => {
        return usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            usuario.email.toLowerCase().includes(termoPesquisa.toLowerCase())
        );
    };

    const alterarPermissao = async (nome, cpf, email, senha, privilegio) => {
        try {
            const body = {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                privilegio: privilegio === 'normal' ? 'adm' : 'normal'
            };
            const response = await api.put(`/usuario/${cpf}`, body);
            setTexto(`A permição do usuário ${nome} foi alterada !`);
            mostrarModal();
            listarUsuarios();
        } catch (error) {
            console.error(error);
            // Lidar com erros, se necessário
        }
    };

    useEffect(() => {
        listarUsuarios();
    }, [])

    return (
        <section className="GerenciamentoUsuarioEstilo">
            <Cabecalho2 />

            <main>
                <div class="mainConteudo">
                    <dialog open={modalAberto} id="CaixaDeDialogo">
                        <p>{texto}</p>
                        <button id="botao" onClick={fecharModal}>
                            Ok
                        </button>
                    </dialog>
                    <div class="titulo">
                        <h1>Gerenciamento de usuários</h1>
                    </div>
                    <div class="busca">
                        <div class="pesquisa">
                            <input
                                type="text"
                                placeholder="Pesquisar por: categoria ou nome"
                                value={termoPesquisa}
                                onChange={(e) => setTermoPesquisa(e.target.value)}
                            />
                            <img src="/assets/image/lupa.svg" alt=""></img>
                        </div>
                    </div>


                    <div class="tabelaUsuario">
                        {filtrarUsuarios().length === 0 ? (
                            <p>Nenhum usuario encontrado com esse nome =&#40;</p>
                        ) : (
                            <table>
                                <tr>
                                    <th>Nome usuario</th>
                                    <th>E-mail</th>
                                    <th>Permição</th>
                                </tr>
                                {filtrarUsuarios().map((usuario) => (
                                    <tr class='Conteudo'>
                                        <td class='primeiro'>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td class='final'><button onClick={() => alterarPermissao(usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.privilegio)}>
                                            {usuario.privilegio === 'normal' ? (
                                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_413_130)">
                                                        <path d="M11 14.0625C14.416 14.0625 17.1875 10.9131 17.1875 7.03125C17.1875 3.14941 14.416 0 11 0C7.58398 0 4.8125 3.14941 4.8125 7.03125C4.8125 10.9131 7.58398 14.0625 11 14.0625ZM16.5 15.625H14.1324C13.1785 16.123 12.1172 16.4062 11 16.4062C9.88281 16.4062 8.82578 16.123 7.86758 15.625H5.5C2.46211 15.625 0 18.4229 0 21.875V22.6562C0 23.9502 0.923828 25 2.0625 25H19.9375C21.0762 25 22 23.9502 22 22.6562V21.875C22 18.4229 19.5379 15.625 16.5 15.625Z" fill="black" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_413_130">
                                                            <rect width="22" height="25" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            ) : (
                                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_413_132)">
                                                        <path d="M11 12.5C14.4719 12.5 17.2857 9.70215 17.2857 6.25C17.2857 2.79785 14.4719 0 11 0C7.52812 0 4.71429 2.79785 4.71429 6.25C4.71429 9.70215 7.52812 12.5 11 12.5ZM15.7045 14.0918L13.3571 23.4375L11.7857 16.7969L13.3571 14.0625H8.64286L10.2143 16.7969L8.64286 23.4375L6.29554 14.0918C2.7942 14.2578 0 17.1045 0 20.625V22.6562C0 23.9502 1.0558 25 2.35714 25H19.6429C20.9442 25 22 23.9502 22 22.6562V20.625C22 17.1045 19.2058 14.2578 15.7045 14.0918Z" fill="black" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_413_132">
                                                            <rect width="22" height="25" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            )}
                                        </button></td>
                                    </tr>
                                ))}
                            </table>
                        )}
                    </div>
                    <div class="tabelaMobile">
                        {filtrarUsuarios().length === 0 ? (
                            <p>Nenhum usuario encontrado com esse nome =&#40;</p>
                        ) : (
                            <table>
                                <tr>
                                    <th>Nome usuario</th>
                                    <th>Permição</th>
                                </tr>
                                {filtrarUsuarios().map((usuario) => (
                                    <tr class='Conteudo'>
                                        <td class='primeiro'>{usuario.nome}</td>
                                        <td class='final'><button onClick={() => alterarPermissao(usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.privilegio)}>
                                            {usuario.privilegio === 'normal' ? (
                                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_413_130)">
                                                        <path d="M11 14.0625C14.416 14.0625 17.1875 10.9131 17.1875 7.03125C17.1875 3.14941 14.416 0 11 0C7.58398 0 4.8125 3.14941 4.8125 7.03125C4.8125 10.9131 7.58398 14.0625 11 14.0625ZM16.5 15.625H14.1324C13.1785 16.123 12.1172 16.4062 11 16.4062C9.88281 16.4062 8.82578 16.123 7.86758 15.625H5.5C2.46211 15.625 0 18.4229 0 21.875V22.6562C0 23.9502 0.923828 25 2.0625 25H19.9375C21.0762 25 22 23.9502 22 22.6562V21.875C22 18.4229 19.5379 15.625 16.5 15.625Z" fill="black" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_413_130">
                                                            <rect width="22" height="25" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            ) : (
                                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_413_132)">
                                                        <path d="M11 12.5C14.4719 12.5 17.2857 9.70215 17.2857 6.25C17.2857 2.79785 14.4719 0 11 0C7.52812 0 4.71429 2.79785 4.71429 6.25C4.71429 9.70215 7.52812 12.5 11 12.5ZM15.7045 14.0918L13.3571 23.4375L11.7857 16.7969L13.3571 14.0625H8.64286L10.2143 16.7969L8.64286 23.4375L6.29554 14.0918C2.7942 14.2578 0 17.1045 0 20.625V22.6562C0 23.9502 1.0558 25 2.35714 25H19.6429C20.9442 25 22 23.9502 22 22.6562V20.625C22 17.1045 19.2058 14.2578 15.7045 14.0918Z" fill="black" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_413_132">
                                                            <rect width="22" height="25" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            )}
                                        </button></td>
                                    </tr>
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