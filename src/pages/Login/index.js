import './index.scss';
import { Link } from "react-router-dom";
import imagemLogin from '../../assets/image/imagemLogin.svg';
import linhaLogin from '../../assets/image/linhaLogin.svg';
import Cabecalho1 from '../../components/Cabecalho1';
import Rodape from '../../components/Rodape';

import '../../css/global.css';

export default function Login() {
    return (
        <section className='LoginEstilo'>

            <Cabecalho1 />

            <main>
                <section class="conteudoMain">
                    <div class="imagem">
                        <img src="/assets/image/imagemLogin.svg"
                            alt="Uma imagem representando o cliente em um catalogo de loja de roupa"/>
                    </div>
                    <div class="areaLogin">
                        <div class="loginTexto">
                            <h1>LOGIN</h1>
                            <h2>BEM VINDO DE VOLTA</h2>
                            <img src={linhaLogin}
                                alt="Linha  separando caixas de texto do titulo"></img>
                        </div>
                        <form action="">
                            <label for="">e-mail:</label>
                            <input type="text"></input>
                            <label for="">senha:</label>
                            <input type="text"></input>
                            <a href="">Esqueceu sua senha?</a>
                            <input type="submit" value="Login"></input>
                        </form>
                        <div class="criarConta">
                            <p>Ainda nao te conta?<Link to="/cadastro">Clique aqui</Link></p>
                        </div>
                    </div>
                </section>
            </main>

            <Rodape />

        </section>
    );
}