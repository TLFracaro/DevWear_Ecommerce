import './index.scss';

export default function Produto_Exibir(props) {
    return (
        <section class='Estilo_ProdutoExibir'>
            <div class='caixa'>
                <img src={props.imagem} alt='' />
                <div class='dados'>
                    <h3>{props.nomeProd}</h3>
                    <h4>R$ {props.preco}</h4>
                </div>
            </div>
        </section>
    );
}
