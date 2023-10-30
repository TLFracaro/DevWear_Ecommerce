import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import Cabecalho1 from '../../components/Cabecalho1';
import Rodape from '../../components/Rodape';
import '../../css/global.css';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [texto, setTexto] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();

    const fecharModal = () => {
        setModalAberto(false);
    };

    const mostrarModal = () => {
        setModalAberto(true);
    };

    const login = async () => {
        try {
            let body = {
                email: email,
                senha: senha,
            };

            const usuario = await axios.post('http://localhost:5000/login/', body);

            if (usuario) {
                navigate('/menuadm');
            } else {
                setTexto('O usuário não existe!');
                mostrarModal();
            }
        } catch (error) {
            setTexto('Ocorreu um erro ao realizar login.');
            mostrarModal();
        }
    };

    const enviar = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <section className="LoginEstilo">
            <Cabecalho1 />

            <main>
                <section className="conteudoMain">
                    <dialog open={modalAberto} className="modalDialog">
                        <p>{texto}</p>
                        <button id="botao" onClick={fecharModal}>
                            OK
                        </button>
                        <div className="backDrop"></div>
                    </dialog>
                    <div className="imagem">
                        <img
                            src="/assets/image/imagemLogin.svg"
                            alt="Uma imagem representando o cliente em um catálogo de loja de roupa"
                        />
                    </div>
                    <div className="areaLogin">
                        <div className="loginTexto">
                            <h1>LOGIN</h1>
                            <h2>BEM VINDO DE VOLTA</h2>
                            <img src="/assets/image/linhaLogin.svg" alt="Linha separando caixas de texto do título" />
                        </div>
                        <form action="">
                            <label htmlFor="">e-mail:</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="">senha:</label>
                            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <Link>Esqueceu sua senha?</Link>
                            <button type="button" onClick={enviar}>
                                Login
                            </button>
                        </form>
                        <div className="criarConta">
                            <p>
                                Ainda não tem conta?<Link to="/cadastro">Clique aqui</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Rodape />
        </section>
    );
}
