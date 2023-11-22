import "./App.scss"
import cartaz1 from '../../assets/image/cartaz1.svg';
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";

import '../../css/global.css';
import { useState } from "react";

export default function Home() {
    const [produto, setProduto] = useState([]);

    return (
        <section className="HomeEstilo">

            <Cabecalho1 />

            <main>
                <div className='conteudoMain'>
                    <div className='faixa1'>
                        <img src={cartaz1} alt="" />
                    </div>
                    <div className='produtosExibir'>
                        <h2>Nossos produtos:</h2>
                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}