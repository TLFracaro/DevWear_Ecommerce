import { inserirUsuario, salvarItem, logar, listarUsuarios, excluirUsuario, alterarUsuario, excluirItem, listarItens, consultarItem, alterarItem, pesquisarUsuario } from '../repository/lojaRepository.js';
import { Router, query } from "express";

const endpoints = Router();

endpoints.get('/usuario/listar', async (req, resp) => {
    try {
        const r = await listarUsuarios();
        console.log(r)
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
})

endpoints.post('/usuario', async (req, resp) => {
    try {
        let usuario = req.body;
        let r = await inserirUsuario(usuario);
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});


endpoints.delete('/usuario/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;
        let r = await excluirUsuario(cpf);
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.put('/usuario/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;
        const usuario = req.body;
        let r = await alterarUsuario(usuario, cpf);
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.get('/usuario/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;
        const r = await pesquisarUsuario(cpf);
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        let r = await logar(email, senha)
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.post('/produto', async (req, resp) => {
    try {
        const { item, variacoes, imagens } = req.body;
        let r = await salvarItem(item, variacoes, imagens);
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.delete("/produto/:sku", async (req, resp) => {
    try {
        const sku = req.params.sku;
        const r = await excluirItem(sku);
        resp.send(r);
    } catch (error) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.get('/produto/listar', async (req, resp) => {
    try {
        const r = await listarItens();
        resp.send(r);
    } catch (e) {
        console.error(e);
        resp.status(400).send({
            erro: e.message
        });
    }
});

endpoints.get('/produto/:sku', async (req, resp) => {
    try {
        const sku = req.params.sku;
        const r = await consultarItem(sku);
        resp.send(r);
    } catch (e) {
        console.error('Erro ao buscar detalhes do produto:', e);
        resp.status(500).send('Erro ao buscar detalhes do produto');
    }
});


endpoints.put('/produto/:sku', async (req, res) => {
    try {
        const sku = req.params.sku;
        const novosDados = req.body;

        const resultadoAlteracao = await alterarItem(sku, novosDados);

        res.send(resultadoAlteracao);
    } catch (e) {
        console.error(e);
        res.status(400).send({ erro: e.message });
    }
});



export default endpoints;