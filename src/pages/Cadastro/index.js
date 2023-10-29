import './index.scss';

import linhaLogin from '../../assets/image/linhaLogin.svg';
import Cabecalho1 from '../../components/Cabecalho1';
import Rodape from '../../components/Rodape';

import '../../css/global.css';
import { useState } from 'react';
import axios from 'axios';


export default function Cadastro() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState('');
    const [cpfValdio, setcpfValdio] = useState(false);
    const [email, setEmail] = useState();
    const [emailValido, setEmailValido] = useState('');
    const [confEmail, setConfEmail] = useState();
    const [senha, setSenha] = useState();
    const [confSenha, setConfSenha] = useState();
    const [senhasIguais, setSenhasIguais] = useState();

    const cadastrarUsuario = async () => {
        const cpfNumeros = cpf.replace(/\D/g, '');
        const emailValido = validarEmail(email);
        const senhasSaoIguais = validarSenhas(senha, confSenha);

        if (cpfNumeros.length === 11 && emailValido && senhasSaoIguais) {
            try {
                let privilegio = 'normal';
                let body = {
                    nome: nome,
                    cpf: cpfNumeros,
                    email: email,
                    senha: senha,
                    privilegio: privilegio
                };

                await axios.post('http://localhost:5000/usuario/cadastro/', body);
            } catch (error) {
                console.error('Erro ao cadastrar o usuário:', error);
            }
        } else {
            alert('Preencha os campos corretamente.');
        }
    };

    const formatarCpf = (value) => {
        return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').substr(0, 14);
    };

    const validarCpf = (cpf) => {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) return false;

        const calcularDigito = (slice) => {
            let soma = 0;
            for (let i = 0; i < slice; i++) {
                soma += parseInt(cpf.charAt(i)) * (slice + 1 - i);
            }
            return (soma * 10) % 11 % 10;
        };

        const digito1 = calcularDigito(9);
        const digito2 = calcularDigito(10);

        return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const identificarCpf = (e) => {
        const valor = e.target.value;
        const cpfFormatado = formatarCpf(valor);
        setCpf(cpfFormatado);

        setcpfValdio(!validarCpf(valor));
    };

    const identificarEmail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setEmailValido(inputEmail === confEmail && validarEmail(inputEmail));
    }

    const validarSenhas = (senha, confirmacaoSenha) => {
        if (senha === confirmacaoSenha && senha !== '' && confirmacaoSenha !== '') {
            setSenhasIguais(true);
        } else {
            setSenhasIguais(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        cadastrarUsuario();
    };
    

    return (
        <section className='CadastroEstilo'>

            <Cabecalho1 />

            <main>
                <section class="conteudoMain">
                    <div class="areaCadastro">
                        <div class="loginTexto">
                            <h1>Cadastro</h1>
                            <h2>faca parte do nosso time!</h2>
                            <img src={linhaLogin}
                                alt="Linha  separando caixas de texto do titulo"></img>
                        </div>
                        <form action="">
                            <label for="">nome completo:</label>
                            <input type="text" value={nome} onChange={e => setNome(e.target.value)} />

                            <label for="">cpf:</label>
                            <input type="text" value={cpf} onChange={identificarCpf} style={cpfValdio ? { border: '2px solid red' } : validarCpf(cpf) ? { border: '2px solid green' } : null} />

                            <label>E-mail:</label>
                            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setEmailValido(validarEmail(e.target.value)); }} style={!email ? { border: 'none' } : emailValido ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Confirmar E-mail:</label>
                            <input type="text" value={confEmail} onChange={(e) => setConfEmail(e.target.value)} onBlur={() => { setEmailValido(email === confEmail && validarEmail(confEmail)); }} style={!confEmail ? { border: 'none' } : email === confEmail && emailValido ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Senha:</label>
                            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} onBlur={() => { validarSenhas(senha, confSenha); }} style={!senha ? { border: 'none' } : senhasIguais ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Confirmar Senha:</label>
                            <input type="password" value={confSenha} onChange={(e) => setConfSenha(e.target.value)} onBlur={() => { validarSenhas(senha, confSenha); }} style={!confSenha ? { border: 'none' } : senhasIguais ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <button type="button" onClick={handleSubmit}>Cadastrar-se</button>
                        </form>
                    </div>
                </section>
            </main>

            <Rodape />

        </section>
    );
}