import "./index.scss"
import Cabecalho2 from "../../components/Cabecalho2";

import '../../css/global.css';
import Rodape from "../../components/Rodape";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GerenciamentoUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    async function listarUsuarios() {
        let r = await axios.get('http://localhost:5000/usuario/listar/');
        let usuarios = r.data;
        setUsuarios(usuarios);
    }

    const filtrarUsuarios = () => {
        return usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            usuario.email.toLowerCase().includes(termoPesquisa.toLowerCase())
        );
    };

    useEffect(() => {
        listarUsuarios();
    }, [])

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
                                        <td class='final'>{usuario.privilegio}</td>
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