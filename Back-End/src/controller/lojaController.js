//alterei aqui
import { inserirUsuario, salvarItem, logar, listarUsuarios, excluirUsuario, alterarUsuario, excluirItem, listarItens, consultarItem, alterarItem, pesquisarUsuario, buscarImagem } from '../repository/lojaRepository.js';
import multer from 'multer';
import { Router } from 'express';
import express from 'express';

const endpoints = Router();
endpoints.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
});

/**
 * Rota para listar todos os usuários cadastrados.
 * @route GET /usuario/listar
 * @returns {Object} - Objeto contendo a lista de usuários.
 * @throws {Error} - Lança um erro se houver problema durante a listagem.
 */
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

/**
 * Rota para cadastrar um novo usuário.
 * @route POST /usuario
 * @param {Object} req.body - Objeto contendo informações do novo usuário.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante o cadastro.
 */
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

/**
 * Rota para excluir um usuário com base no CPF.
 * @route DELETE /usuario/:cpf
 * @param {string} req.params.cpf - CPF do usuário a ser excluído.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a exclusão.
 */
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

/**
 * Rota para alterar informações de um usuário com base no CPF.
 * @route PUT /usuario/:cpf
 * @param {string} req.params.cpf - CPF do usuário a ser alterado.
 * @param {Object} req.body - Novas informações do usuário.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a alteração.
 */
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

/**
 * Rota para pesquisar um usuário com base no CPF.
 * @route GET /usuario/:cpf
 * @param {string} req.params.cpf - CPF do usuário a ser pesquisado.
 * @returns {Object} - Objeto com informações do usuário ou mensagem de não encontrado.
 * @throws {Error} - Lança um erro se houver problema durante a pesquisa.
 */
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

/**
 * Rota para realizar o login de um usuário.
 * @route POST /login
 * @param {Object} req.body - Objeto contendo e-mail e senha do usuário.
 * @returns {Object} - Objeto com mensagem de sucesso (login bem-sucedido) ou mensagem de erro.
 * @throws {Error} - Lança um erro se houver problema durante o login.
 */
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

/**
 * Rota para cadastrar um novo produto no sistema.
 * @route POST /produto
 * @param {Object} req.body - Objeto contendo informações do novo produto, variações e imagens.
 * @param {Array} req.files - Array de imagens em formato base64.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante o cadastro do produto.
 */
endpoints.post('/produto', upload.array('imagens'), async (req, resp) => {
    try {
        console.log('Requisição POST recebida em /produto');
        console.log('Conteúdo de req.body:', req.body);
        const { item, variacoes } = req.body;

        const imagens = req.files;

        if (!Array.isArray(imagens) || imagens.some(img => !img.buffer)) {
            throw new Error('Formato inválido para imagens.');
        }

        console.log('Dados recebidos:', { item, variacoes, imagens });

        console.log('passei para repository');
        let r = await salvarItem(req.body, imagens); 

        resp.send('Requisição processada com sucesso.');
    } catch (e) {
        console.error('Erro ao processar a requisição:', e);
        resp.status(400).send({
            erro: e.message,
        });
    }
});


/**
 * Rota para excluir um produto com base no SKU.
 * @route DELETE /produto/:sku
 * @param {string} req.params.sku - SKU do produto a ser excluído.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a exclusão do produto.
 */
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

/**
 * Rota para listar todos os produtos cadastrados.
 * @route GET /produto/listar
 * @returns {Array} - Array de objetos contendo informações dos produtos.
 * @throws {Error} - Lança um erro se houver problema durante a listagem dos produtos.
 */
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

/**
 * Rota para buscar detalhes de um produto com base no SKU.
 * @route GET /produto/:sku
 * @param {string} req.params.sku - SKU do produto a ser consultado.
 * @returns {Object} - Objeto com informações do produto, variações e imagens.
 * @throws {Error} - Lança um erro se houver problema durante a busca dos detalhes do produto.
 */
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

/**
 * Rota para alterar informações de um produto com base no SKU.
 * @route PUT /produto/:sku
 * @param {string} req.params.sku - SKU do produto a ser alterado.
 * @param {Object} req.body - Novas informações do produto.
 * @param {Array} req.files - Array de novas imagens em formato base64.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a alteração do produto.
 */
endpoints.put('/produto/:sku', upload.array('novasImagens'), async (req, res) => {
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
