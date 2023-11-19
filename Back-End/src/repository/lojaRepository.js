import { format } from 'mysql2';
import { con } from './conection.js';

/**
 * Função para inserir um novo usuário no banco de dados.
 * @param {Object} usuario - Informações do usuário a serem inseridas.
 * @param {string} usuario.nome - Nome do usuário.
 * @param {string} usuario.cpf - CPF do usuário.
 * @param {string} usuario.email - E-mail do usuário.
 * @param {string} usuario.senha - Senha do usuário.
 * @param {string} usuario.privilegio - Nível de privilégio do usuário.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a inserção.
 */
export async function inserirUsuario(usuario) {
    try {
        const comando = 'INSERT INTO usuario (nome, cpf, email, senha, privilegio) VALUES(?,?,?,?,?)'
        const [info] = await con.query(comando, [usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.privilegio])
        const usuarioCadastrado = { ...usuario };
        return { message: `Usuário cadastrado com sucesso!`, usuario: usuarioCadastrado };
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            console.error('Erro: Chave primária duplicada. O registro já existe.');
            return { message: 'O CPF já está cadastrado no sistema' };
        } else {
            throw new Error('Erro ao cadastrar usuário: ' + e.message);
        }
    }
}

/**
 * Função para alterar informações de um usuário no banco de dados.
 * @param {Object} usuario - Novas informações do usuário.
 * @param {string} usuario.nome - Novo nome do usuário.
 * @param {string} usuario.cpf - Novo CPF do usuário.
 * @param {string} usuario.email - Novo e-mail do usuário.
 * @param {string} usuario.senha - Nova senha do usuário.
 * @param {string} usuario.privilegio - Novo nível de privilégio do usuário.
 * @param {string} cpfPassado - CPF atual do usuário.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a alteração.
 */
export async function alterarUsuario(usuario, cpfPassado) {
    try {
        if (!usuario) {
            throw new Error('Objeto de usuário não fornecido para a função de alteração.');
        }

        const { nome, cpf, email, senha, privilegio } = usuario;
        if (!nome || !cpf || !email || !senha || !privilegio) {
            throw new Error('Todos os campos do usuário devem ser fornecidos para a alteração.');
        }

        const comando = `UPDATE usuario SET nome = ?, cpf = ?, email = ?, senha = ?, privilegio = ? WHERE cpf = ?`;
        await con.query(comando, [nome, cpf, email, senha, privilegio, cpfPassado]);
        return { mensage: "Usuario alterado com sucesso!" };
    } catch (e) {
        throw new Error(`Erro ao alterar usuário: ${e.message}`);
    }
}

/**
 * Função para listar todos os usuários cadastrados no banco de dados.
 * @returns {Array} - Array de objetos contendo informações dos usuários.
 * @throws {Error} - Lança um erro se houver problema durante a listagem.
 */
export async function listarUsuarios() {
    try {
        const comando = 'SELECT * FROM usuario';
        const [info] = await con.query(comando)
        return info;
    } catch (e) {
        throw new Error('Erro ao listar usuarios');
    }
}

/**
 * Função para excluir um usuário do banco de dados com base no CPF.
 * @param {string} cpf - CPF do usuário a ser excluído.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a exclusão.
 */
export async function excluirUsuario(cpf) {
    try {
        const comando = 'DELETE FROM usuario WHERE cpf = ?';
        await con.query(comando, [cpf]);
        return { message: `Usuário do CPF ${cpf} excluído com sucesso` };
    } catch (error) {
        throw new Error('O CPF informado não existe ou ocorreu um erro na exclusão');
    }
}

/**
 * Função para pesquisar um usuário no banco de dados com base no CPF.
 * @param {string} cpf - CPF do usuário a ser pesquisado.
 * @returns {Object} - Objeto com informações do usuário ou mensagem de usuário não encontrado.
 * @throws {Error} - Lança um erro se houver problema durante a pesquisa.
 */
export async function pesquisarUsuario(cpf) {
    try {
        const comando = "SELECT * FROM usuario WHERE cpf = ?";
        const [info] = await con.query(comando, [cpf]);
        if (info === null) {
            return { mensage: "Usuário não encontrado" }
        } else {
            return info;
        }
    } catch (error) {
        throw new Error('Erro ao encontrar funcionário.');
    }
}

/**
 * Função para autenticar um usuário com base no e-mail e senha.
 * @param {string} email - E-mail do usuário.
 * @param {string} senha - Senha do usuário.
 * @returns {Object} - Objeto com informações do usuário autenticado ou mensagem de credenciais inválidas.
 * @throws {Error} - Lança um erro se houver problema durante a autenticação.
 */
export async function logar(email, senha) {
    try {

        const comando = 'SELECT nome, cpf, email, privilegio FROM usuario WHERE email=? AND senha=?';
        const [info] = await con.query(comando, [email, senha]);

        if (info.length === 1) {
            return {
                message: 'Login bem-sucedido',
                nome: info[0].nome,
                cpf: info[0].cpf,
                email: info[0].email,
                privilegio: info[0].privilegio
            };
        } else {
            return ('E-mail ou senha inválidos');
        }
    } catch (error) {
        console.error('Erro ao logar:', error.message);
        throw new Error('Erro ao encontrar funcionário. Verifique o console para detalhes.');
    }
}

/**
 * Função para salvar um novo item no banco de dados.
 * @param {Object} item - Informações do item a serem inseridas.
 * @param {string} item.sku - SKU (Stock Keeping Unit) do item.
 * @param {string} item.nome - Nome do item.
 * @param {string} item.categoria - Categoria do item.
 * @param {string} item.marca - Marca do item.
 * @param {number} item.preco - Preço do item.
 * @param {string} item.descricao - Descrição do item.
 * @param {string} item.loc_estoque - Localização no estoque.
 * @param {number} item.peso - Peso do item.
 * @param {Array} item.variacoes - Array contendo informações de variações do item.
 * @param {string} item.variacoes[].tamanho - Tamanho da variação.
 * @param {string} item.variacoes[].cor - Cor da variação.
 * @param {number} item.variacoes[].quantidade - Quantidade disponível da variação.
 * @param {Array} item.imagens - Array contendo imagens do item em formato base64.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a inserção.
 */
export async function salvarItem(item) {
    try {
        const dataDeInclusao = new Date();
        const dataFormatada = format(dataDeInclusao, 'yyyy-MM-dd HH:mm:ss');

        await con.beginTransaction();

        const comandoItem = `INSERT INTO item (sku, nome, categoria, marca, preco, descricao, loc_estoque, peso, dataDeInclusao) VALUES(?,?,?,?,?,?,?,?, ?)`;
        await con.query(comandoItem, [item.sku, item.nome, item.categoria, item.marca, item.preco, item.descricao, item.loc_estoque, item.peso, dataFormatada]);

        for (const variacao of item.variacoes) {
            const comandoVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoVariacao, [item.sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        for (const imagem of item.imagens) {
            const imagemBase64 = imagem;
            const comandoImagem = `INSERT INTO imagens (item_sku, imagem_base64) VALUES(?, ?)`;
            await con.query(comandoImagem, [item.sku, imagemBase64]);
        }

        await con.commit();

        const [variacoesInseridas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [item.sku]);
        const [imagensInseridas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [item.sku]);

        const itemInserido = { ...item, variacoes: variacoesInseridas, imagens: imagensInseridas };
        return { message: 'Item inserido com sucesso', item: itemInserido };
    } catch (e) {
        await con.rollback();
        console.error('Erro durante a transação:', e.message);
        return { error: `Erro durante a transação: ${e.message}` };
    }
}


/**
 * Função para excluir um item do banco de dados com base no SKU.
 * @param {string} sku - SKU do item a ser excluído.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a exclusão.
 */
export async function excluirItem(sku) {
    try {
        const itemExiste = await con.query("SELECT sku FROM item WHERE sku = ?", [sku]);
        if (itemExiste.length === 0) {
            return { success: false, message: `Item com SKU ${sku} não existe na base de dados.` };
        } else {
            await con.query("DELETE FROM variacao WHERE item_sku = ?", [sku]);

            await con.query("DELETE FROM imagens WHERE item_sku = ?", [sku]);

            await con.query("DELETE FROM item WHERE sku = ?", [sku]);

            return { message: `Item com SKU ${sku} e registros associados foram excluídos com sucesso!` };
        }
    } catch (e) {
        return { message: `Erro ao excluir o item com SKU ${sku}: ${e.message}` };
    }
}

/**
 * Função para listar todos os itens cadastrados no banco de dados.
 * @returns {Array} - Array de objetos contendo informações dos itens.
 * @throws {Error} - Lança um erro se houver problema durante a listagem.
 */
export async function listarItens() {
    try {
        const query = `SELECT * FROM item`;
        const [produtos] = await con.query(query);
        return produtos;
    } catch (error) {
        throw new Error(`Erro ao listar produtos com variações e imagens: ${error.message}`);
    }
}

/**
 * Função para consultar as informações de um item no banco de dados com base no SKU.
 * @param {string} sku - SKU do item a ser consultado.
 * @returns {Object} - Objeto com informações do item, variações e imagens.
 * @throws {Error} - Lança um erro se houver problema durante a consulta.
 */
export async function consultarItem(sku) {
    try {
        const infoItem = `SELECT * FROM item WHERE sku = ?`;
        const infoImagens = `SELECT * FROM imagens WHERE item_sku = ?`;
        const infoVariacao = `SELECT * FROM variacao WHERE item_sku = ?`;

        const [item] = await con.query(infoItem, [sku]);
        const [imagens] = await con.query(infoImagens, [sku]);
        const [variacaoResults] = await con.query(infoVariacao, [sku]);

        const variacao = variacaoResults.map(variacao => {
            return {
                id: variacao.id,
                item_sku: variacao.item_sku,
                tamanho: variacao.tamanho.toString('utf8'),
                cor: variacao.cor.toString('utf8'),
                quantidade: variacao.quantidade
            };
        });

        const produto = {
            item: item[0],
            imagens: imagens,
            variacao: variacao
        };

        return produto;
    } catch (e) {
        throw new Error(`Erro ao consultar o produto: ${e.message}`);
    }
}

/**
 * Função para alterar informações de um item no banco de dados com base no SKU.
 * @param {string} sku - SKU do item a ser alterado.
 * @param {Object} novosDados - Novas informações do item.
 * @param {string} novosDados.nome - Novo nome do item.
 * @param {string} novosDados.categoria - Nova categoria do item.
 * @param {string} novosDados.marca - Nova marca do item.
 * @param {number} novosDados.preco - Novo preço do item.
 * @param {string} novosDados.descricao - Nova descrição do item.
 * @param {string} novosDados.loc_estoque - Nova localização no estoque.
 * @param {number} novosDados.peso - Novo peso do item.
 * @param {Array} novosDados.variacoes - Array contendo novas informações de variações do item.
 * @param {string} novosDados.variacoes[].tamanho - Novo tamanho da variação.
 * @param {string} novosDados.variacoes[].cor - Nova cor da variação.
 * @param {number} novosDados.variacoes[].quantidade - Nova quantidade disponível da variação.
 * @param {Array} novosDados.imagens - Array contendo novas imagens do item em formato base64.
 * @returns {Object} - Objeto com mensagem de sucesso ou erro.
 * @throws {Error} - Lança um erro se houver problema durante a alteração.
 */
export async function alterarItem(sku, novosDados) {
    try {
        const dataDeAtualizacao = new Date();
        const dataFormatada = format(dataDeAtualizacao, 'yyyy-MM-dd HH:mm:ss');

        await con.beginTransaction();

        const comandoItem = `UPDATE item SET nome=?, categoria=?, marca=?, preco=?, descricao=?, loc_estoque=?, peso=?, dataDeInclusao=? WHERE sku=?`;
        await con.query(comandoItem, [novosDados.nome, novosDados.categoria, novosDados.marca, novosDados.preco, novosDados.descricao, novosDados.loc_estoque, novosDados.peso, dataFormatada, sku]);

        const comandoRemoverVariacoes = `DELETE FROM variacao WHERE item_sku=?`;
        await con.query(comandoRemoverVariacoes, [sku]);

        for (const variacao of novosDados.variacoes) {
            const comandoVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoVariacao, [sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        const comandoRemoverImagens = `DELETE FROM imagens WHERE item_sku=?`;
        await con.query(comandoRemoverImagens, [sku]);
        
        for (const imagem of novosDados.imagens) {
            const imagemBase64 = imagem;
            const comandoImagem = `INSERT INTO imagens (item_sku, imagem_base64) VALUES(?, ?)`;            console.log('Imagem a ser inserida:', { sku: sku, imagemBase64 });
            await con.query(comandoImagem, [sku, imagemBase64]);
        }

        await con.commit();

        const [variacoesAtualizadas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [sku]);
        const [imagensAtualizadas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [sku]);

        const itemAtualizado = { ...novosDados, variacoes: variacoesAtualizadas, imagens: imagensAtualizadas };
        return { message: 'Item alterado com sucesso', item: itemAtualizado };
    } catch (e) {
        await con.rollback();
        console.error('Erro durante a transação:', e.message);
        return { error: `Erro durante a transação: ${e.message}` };
    }
}







