//alterei aqui
import { inserirUsuario, salvarItem, logar, listarUsuarios, excluirUsuario, alterarUsuario, excluirItem, listarItens, consultarItem, alterarItem, pesquisarUsuario } from '../repository/lojaRepository.js';
import multer from 'multer';
import { Router } from 'express';
import express from 'express';

/**
 * Roteador para lidar com endpoints relacionados a usuários e produtos.
 * @type {Router}
 */
const endpoints = Router();
endpoints.use(express.json());

/**
 * Middleware para lidar com upload de arquivos usando o Multer.
 */
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

/**
 * Criar um novo usuário.
 * @name POST /usuario
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express contendo dados do usuário.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se dados obrigatórios do usuário estiverem ausentes ou se houver um erro durante a criação do usuário.
 */
endpoints.post('/usuario', async (req, resp) => {
    try {
        const usuario = req.body;

        if (!usuario || !usuario.nome || !usuario.cpf || !usuario.email || !usuario.senha || !usuario.privilegio) {
            throw new Error('Todos os campos devem ser preenchidos.');
        }

        const resultado = await inserirUsuario(usuario);

        resp.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso.',
            data: resultado.usuario,
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);

        if (error.statusCode === 400) {
            resp.status(400).json({
                success: false,
                error: error.message,
            });
        } else {
            resp.status(500).json({
                success: false,
                error: 'Erro interno do servidor ao cadastrar usuário.',
                details: error.message,
            });
        }
    }
});

/**
 * Atualizar um usuário existente pelo CPF (Cadastro de Pessoa Física).
 * @name PUT /usuario/:cpf
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express contendo dados atualizados do usuário.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se dados obrigatórios do usuário estiverem ausentes, CPF for inválido ou se houver um erro durante a atualização do usuário.
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
 * Obter uma lista de todos os usuários.
 * @name GET /usuario/listar
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se ocorrer um erro ao listar os usuários.
 */
endpoints.get('/usuario/listar', async (req, resp) => {
    try {
        const listaUsuarios = await listarUsuarios();

        resp.send(listaUsuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        resp.status(400).send({
            erro: error.message,
        });
    }
});

/**
 * Excluir um usuário pelo CPF.
 * @name DELETE /usuario/:cpf
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se CPF for inválido ou se houver um erro durante a exclusão do usuário.
 */
endpoints.delete('/usuario/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;

        if (!cpf || typeof cpf !== 'string' || cpf.length !== 11) {
            resp.status(400).json({
                success: false,
                error: 'CPF inválido.',
            });
            return;
        }

        const resultado = await excluirUsuario(cpf);

        if (resultado.success) {
            resp.json({
                success: true,
                message: `Usuário com CPF ${cpf} excluído com sucesso.`,
            });
        } else {

            if (resultado.statusCode === 400) {
                resp.status(400).json({
                    success: false,
                    error: resultado.error,
                });
            } else {
                throw resultado;
            }
        }
    } catch (error) {
        console.error(`Erro ao excluir usuário com CPF ${cpf}:`, error);
        resp.status(500).json({
            success: false,
            error: `Erro interno do servidor ao excluir usuário com CPF ${cpf}.`,
        });
    }
});

/**
 * Obter detalhes do usuário pelo CPF.
 * @name GET /usuario/:cpf
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se CPF for inválido ou se houver um erro durante a recuperação do usuário.
 */
endpoints.get('/usuario/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;

        if (!/^\d{11}$/.test(cpf)) {
            resp.status(400).json({
                success: false,
                error: 'CPF inválido.',
            });
            return;
        }

        const resultado = await pesquisarUsuario(cpf);

        if (resultado.message) {
            resp.json({
                success: true,
                message: 'Usuário encontrado com sucesso.',
                user: resultado,
            });
        } else {
            resp.status(404).json({
                success: false,
                error: 'Usuário não encontrado.',
            });
        }
    } catch (error) {
        console.error(`Erro ao pesquisar usuário com CPF ${cpf}:`, error);
        resp.status(500).json({
            success: false,
            error: `Erro interno do servidor ao pesquisar usuário com CPF ${cpf}.`,
        });
    }
});

/**
 * Criar um novo produto.
 * @name POST /produto
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express contendo dados do produto e imagens.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se dados do produto ou formato da imagem forem inválidos ou se houver um erro durante a criação do produto.
 */
endpoints.post('/produto', upload.array('imagens'), async (req, resp) => {
    try {
        const imagens = req.files;

        if (!Array.isArray(imagens) || imagens.some(img => !img.buffer)) {
            throw new Error('Formato inválido para imagens.');
        }

        let r;
        try {
            r = await salvarItem(req.body, imagens);
        } catch (error) {
            if (error.message.includes('Chave duplicada')) {
                resp.status(400).json({
                    success: false,
                    error: 'Chave duplicada: SKU já cadastrado.',
                });
                return;
            }
            throw error;
        }

        resp.json({
            success: true,
            message: 'Requisição processada com sucesso.',
            result: r,
        });
    } catch (error) {
        console.error('Erro ao processar a requisição de produto:', error);
        resp.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * Atualizar um produto existente pelo SKU.
 * @name PUT /produto/:sku
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express contendo dados atualizados do produto e imagens.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se houver um erro durante a atualização do produto.
 */
endpoints.put('/produto/:sku', upload.array('novasImagens'), async (req, res) => {
    try {
        const sku = req.params.sku;
        const novosDados = req.body;
        const novasImagens = req.files;

        const resultadoAlteracaoProduto = await alterarItem(sku, novosDados);

        res.send(resultadoAlteracaoProduto);
    } catch (error) {
        console.error('Erro ao alterar produto:', error);
        res.status(400).send({
            erro: error.message,
        });
    }
});

/**
 * Obter uma lista de todos os produtos.
 * @name GET /produto/listar
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se houver um erro durante a listagem dos produtos.
 */
endpoints.get('/produto/listar', async (req, resp) => {
    try {
        const resultadoListar = await listarItens();

        resp.send(resultadoListar);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        resp.status(400).send({
            erro: error.message,
        });
    }
});

/**
 * Excluir um produto pelo SKU (Unidade de Manutenção de Estoque).
 * @name DELETE /produto/:sku
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se houver um erro durante a exclusão do produto.
 */
endpoints.delete("/produto/:sku", async (req, resp) => {
    try {
        const sku = req.params.sku;

        const resultadoExcluir = await excluirItem(sku);

        resp.send(resultadoExcluir);
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        resp.status(400).send({
            erro: error.message,
        });
    }
});

/**
 * Obter detalhes do produto pelo SKU.
 * @name GET /produto/:sku
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se houver um erro durante a recuperação do produto.
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
 * Endpoint de login do usuário.
 * @name POST /login
 * @function
 * @async
 * @param {Object} req - Objeto de requisição do Express contendo e-mail e senha.
 * @param {Object} resp - Objeto de resposta do Express.
 * @throws {Error} Se as credenciais de login forem inválidas ou se houver um erro durante o processamento do login.
 */
endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const resultadoLogin = await logar(email, senha);

        if (resultadoLogin) {
            resp.json({
                success: true,
                message: 'Login bem-sucedido',
                user: resultadoLogin,
            });
        } else {
            resp.status(401).json({
                success: false,
                error: 'E-mail ou senha inválidos',
            });
        }
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        resp.status(500).json({
            success: false,
            error: 'Erro interno do servidor ao processar o login.',
            details: error.message,
        });
    }
});

export default endpoints;
