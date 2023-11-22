import { format } from 'mysql2';
import { con } from './conection.js';

/**
 * Insere um novo usuário no banco de dados.
 *
 * @param {Object} usuario - Objeto contendo informações do usuário.
 * @param {string} usuario.nome - Nome do usuário.
 * @param {string} usuario.cpf - CPF do usuário.
 * @param {string} usuario.email - E-mail do usuário.
 * @param {string} usuario.senha - Senha do usuário.
 * @param {string} usuario.privilegio - Privilégio do usuário.
 * @returns {Object} - Objeto contendo mensagem de sucesso e informações do usuário inserido.
 * @throws {Error} - Lança um erro se houver falha na transação.
 */
export async function inserirUsuario(usuario) {
    try {
        if (!usuario.nome || !usuario.cpf || !usuario.email || !usuario.senha || !usuario.privilegio) {
            throw new Error('Todos os campos devem ser preenchidos.');
        }

        await con.beginTransaction();
        const comando = 'INSERT INTO usuario (nome, cpf, email, senha, privilegio) VALUES (?,?,?,?,?)';
        const [info] = await con.query(comando, [usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.privilegio]);
        await con.commit();

        return { message: 'Usuário cadastrado com sucesso!', usuario: info };
    } catch (e) {
        await con.rollback();

        if (e.code === 'ER_DUP_ENTRY') {
            let campoDuplicado = 'Campo duplicado: ';

            if (e.message.includes('cpf')) {
                campoDuplicado += 'CPF';
            } else if (e.message.includes('email')) {
                campoDuplicado += 'e-mail';
            } else {
                campoDuplicado += 'CPF ou e-mail';
            }

            const error = new Error(`O ${campoDuplicado} já está cadastrado no sistema.`);
            error.statusCode = 400;
            throw error;
        } else {
            throw new Error('Erro ao cadastrar usuário: ' + e.message);
        }
    }
}

/**
 * Altera as informações de um usuário no banco de dados.
 *
 * @param {Object} usuario - Objeto contendo informações atualizadas do usuário.
 * @param {string} cpfPassado - CPF atual do usuário a ser alterado.
 * @returns {Object} - Objeto contendo mensagem de sucesso após a alteração.
 * @throws {Error} - Lança um erro se houver falha na transação ou se os parâmetros fornecidos forem inválidos.
 */
export async function alterarUsuario(usuario, cpfPassado) {
        console.log(usuario);

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
 * Lista todos os usuários cadastrados no banco de dados.
 *
 * @returns {Array} - Array contendo informações de todos os usuários.
 * @throws {Error} - Lança um erro se houver falha na transação.
 */
export async function listarUsuarios() {
    try {
        const comando = 'SELECT * FROM usuario';
        const [info] = await con.query(comando);
        return info;
    } catch (e) {
        throw new Error(`Erro ao listar usuários: ${e.message}`);
    }
}

/**
 * Exclui um usuário com base no CPF fornecido.
 *
 * @param {string} cpf - CPF do usuário a ser excluído.
 * @returns {Object} - Objeto contendo mensagem de sucesso após a exclusão.
 * @throws {Error} - Lança um erro se houver falha na transação ou se o CPF fornecido for inválido.
 */
export async function excluirUsuario(cpf) {
    try {
        if (!cpf || typeof cpf !== 'string' || cpf.length !== 11) {
            throw new Error('CPF inválido.');
        }

        const comando = 'DELETE FROM usuario WHERE cpf = ?';
        const [result] = await con.query(comando, [cpf]);

        if (result.affectedRows === 0) {
            throw new Error(`Não foi possível excluir o usuário com CPF ${cpf}. Usuário não encontrado.`);
        }

        return { message: `Usuário do CPF ${cpf} excluído com sucesso` };
    } catch (error) {
        throw new Error(`Erro ao excluir usuário: ${error.message}`);
    }
}

/**
 * Pesquisa um usuário com base no CPF fornecido.
 *
 * @param {string} cpf - CPF do usuário a ser pesquisado.
 * @returns {Object|Array} - Objeto contendo informações do usuário encontrado ou mensagem de usuário não encontrado.
 * @throws {Error} - Lança um erro se houver falha na transação ou se o CPF fornecido for inválido.
 */
export async function pesquisarUsuario(cpf) {
    try {
        const comando = "SELECT * FROM usuario WHERE cpf = ?";
        const [info] = await con.query(comando, [cpf]);

        if (info.length === 0) {
            return { message: "Usuário não encontrado" };
        } else {
            return info;
        }
    } catch (error) {
        throw new Error(`Erro ao encontrar usuário: ${error.message}`);
    }
}

/**
 * Salva um novo item (produto) no banco de dados.
 *
 * @param {Object} item - Objeto contendo informações do item a ser salvo.
 * @param {string} item.sku - SKU do item.
 * @param {string} item.nome - Nome do item.
 * @param {string} item.categoria - Categoria do item.
 * @param {string} item.marca - Marca do item.
 * @param {number} item.preco - Preço do item.
 * @param {string} item.descricao - Descrição do item.
 * @param {string} item.loc_estoque - Localização no estoque do item.
 * @param {number} item.peso - Peso do item.
 * @param {Array} item.variacoes - Array contendo variações do item.
 * @param {Array} item.imagens - Array contendo imagens do item.
 * @returns {Object} - Objeto contendo mensagem de sucesso e informações do item salvo.
 * @throws {Error} - Lança um erro se houver falha na transação ou se a SKU já estiver cadastrada.
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
        console.log('Item inserido com sucesso:', itemInserido);
        return { success: true, message: 'Item inserido com sucesso', item: itemInserido };
    } catch (e) {
        await con.rollback();
        console.error('Erro durante a transação:', e.message);
    
        if (e.code === 'ER_DUP_ENTRY') {
            const errorMessage = 'Chave duplicada. SKU já cadastrado.';
            console.log('Mensagem de erro do backend:', errorMessage);
            return { success: false, error: errorMessage };
        }
    
        return { success: false, error: `Erro durante a transação: ${e.message}` };
    }
}

/**
 * Altera as informações de um item (produto) no banco de dados.
 *
 * @param {string} sku - SKU do item a ser alterado.
 * @param {Object} novosDados - Objeto contendo novas informações do item.
 * @returns {Object} - Objeto contendo mensagem de sucesso e informações do item alterado.
 * @throws {Error} - Lança um erro se houver falha na transação.
 */
export async function alterarItem(sku, novosDados) {
    try {
        const dataDeAtualizacao = new Date();
        const dataFormatada = format(dataDeAtualizacao, 'yyyy-MM-dd HH:mm:ss');

        await con.beginTransaction();

        const comandoAtualizarItem = `UPDATE item SET nome=?, categoria=?, marca=?, preco=?, descricao=?, loc_estoque=?, peso=?, dataDeInclusao=? WHERE sku=?`;
        await con.query(comandoAtualizarItem, [novosDados.nome, novosDados.categoria, novosDados.marca, novosDados.preco, novosDados.descricao, novosDados.loc_estoque, novosDados.peso, dataFormatada, sku]);

        const comandoRemoverVariacoes = `DELETE FROM variacao WHERE item_sku=?`;
        await con.query(comandoRemoverVariacoes, [sku]);

        for (const variacao of novosDados.variacoes) {
            const comandoInserirVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoInserirVariacao, [sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        const comandoRemoverImagens = `DELETE FROM imagens WHERE item_sku=?`;
        await con.query(comandoRemoverImagens, [sku]);

        for (const imagem of novosDados.imagens) {
            const imagemBase64 = imagem;
            const comandoInserirImagem = `INSERT INTO imagens (item_sku, imagem_base64) VALUES(?, ?)`;
            await con.query(comandoInserirImagem, [sku, imagemBase64]);
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

/**
 * Lista todos os itens (produtos) cadastrados no banco de dados.
 *
 * @returns {Array} - Array contendo informações de todos os itens.
 * @throws {Error} - Lança um erro se houver falha na transação.
 */
export async function listarItens() {
    try {
        const item = `SELECT * FROM item`;
        const [produtos] = await con.query(item);
        return produtos;
    } catch (error) {
        throw new Error(`Erro ao listar produtos com variações e imagens: ${error.message}`);
    }
}

/**
 * Exclui um item (produto) com base no SKU fornecido.
 *
 * @param {string} sku - SKU do item a ser excluído.
 * @returns {Object} - Objeto contendo mensagem de sucesso após a exclusão.
 * @throws {Error} - Lança um erro se houver falha na transação.
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
        console.error(`Erro ao excluir o item com SKU ${sku}: ${e.message}`);
        throw new Error(`Erro ao excluir o item com SKU ${sku}: ${e.message}`);
    }
}

/**
 * Consulta um item (produto) com base no SKU fornecido.
 *
 * @param {string} sku - SKU do item a ser consultado.
 * @returns {Object} - Objeto contendo informações do item consultado.
 * @throws {Error} - Lança um erro se houver falha na transação.
 */
export async function consultarItem(sku) {
    try {
        const queryInfoItem = `SELECT * FROM item WHERE sku = ?`;
        const queryInfoImagens = `SELECT * FROM imagens WHERE item_sku = ?`;
        const queryInfoVariacao = `SELECT * FROM variacao WHERE item_sku = ?`;

        const [item] = await con.query(queryInfoItem, [sku]);
        const [imagens] = await con.query(queryInfoImagens, [sku]);
        const [variacao] = await con.query(queryInfoVariacao, [sku]);

        const produto = {
            item: item[0],
            imagens: imagens,
            variacao: variacao.map(variacao => ({
                id: variacao.id,
                item_sku: variacao.item_sku,
                tamanho: variacao.tamanho.toString('utf8'),
                cor: variacao.cor.toString('utf8'),
                quantidade: variacao.quantidade
            })),
        };

        return produto;
    } catch (e) {
        throw new Error(`Erro ao consultar o produto: ${e.message}`);
    }
}

/**
 * Realiza o login de um usuário com base no e-mail e senha fornecidos.
 *
 * @param {string} email - E-mail do usuário.
 * @param {string} senha - Senha do usuário.
 * @returns {Object|null} - Objeto contendo informações do usuário em caso de login bem-sucedido, ou null em caso de falha no login.
 * @throws {Error} - Lança um erro se houver falha na transação.
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
            return null;
        }
    } catch (error) {
        console.error('Erro ao logar:', e.message);
        throw new Error(`Erro ao logar: ${error.message}`);
    }
}