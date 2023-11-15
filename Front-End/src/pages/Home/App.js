import "./App.scss"
//Melhor Projeto
import balaoMensagem from '../../assets/image/balaoMensagem.svg';
import cartaz1 from '../../assets/image/cartaz1.svg';
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";

import '../../css/global.css';

export default function Home() {
    return (
        <section className="HomeEstilo">

            <Cabecalho1 />

            <main>
                <img src={cartaz1} alt=""></img>
            </main>

            <Rodape />

            <div class="chatBoot">
                <img src={balaoMensagem} alt=""></img>
            </div>
        </section>
    );
}