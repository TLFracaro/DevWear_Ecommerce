import { con } from './conection.js';

export async function inserirUsuario(usuario) {
    try {
        console.log(usuario);
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

export async function listarUsuarios() {
    try {
        const comando = 'SELECT * FROM usuario';
        const [info] = await con.query(comando)
        return info;
    } catch (e) {
        throw new Error('Erro ao listar usuarios');
    }
}

export async function excluirUsuario(cpf) {
    try {
        const comando = 'DELETE FROM usuario WHERE cpf = ?';
        await con.query(comando, [cpf]);
        return { message: `Usuário do CPF ${cpf} excluído com sucesso` };
    } catch (error) {
        throw new Error('O CPF informado não existe ou ocorreu um erro na exclusão');
    }
}

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

export async function logar(email, senha) {
    try {
        console.log('Email:', email);
        console.log('Senha:', senha);

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
            throw new Error('E-mail ou senha inválidos');
        }
    } catch (error) {
        console.error('Erro ao logar:', error.message);
        throw new Error('Erro ao encontrar funcionário. Verifique o console para detalhes.');
    }
}

export async function salvarItem(item, variacoes, imagens) {
    try {
        const dataDeInclusao = new Date();

        const comandoItem = `INSERT INTO item (sku, nome, categoria, marca, preco, descricao, loc_estoque, peso, dataDeInclusao) VALUES(?,?,?,?,?,?,?,?, ?)`;
        await con.query(comandoItem, [item.sku, item.nome, item.categoria, item.marca, item.preco, item.descricao, item.loc_estoque, item.peso, dataDeInclusao]);
        console.log('Iniciando salvamento de item no banco de dados...');

        for (const variacao of variacoes) {
            const comandoVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoVariacao, [item.sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        for (const imagem of imagens) {
            const comandoImagem = `INSERT INTO imagens (item_sku, imagem_url) VALUES(?, ?)`;
            console.log('Imagem a ser inserida:', { item_sku: item.sku, imagem_url: imagem.imagem_url });
            await con.query(comandoImagem, [item.sku, imagem.imagem_url]);
        }

        await con.commit();

        const [variacoesInseridas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [item.sku]);
        const [imagensInseridas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [item.sku]);

        const itemInserido = { ...item, variacoes: variacoesInseridas, imagens: imagensInseridas };
        console.log('Item salvo com sucesso!');
        return { message: 'Item inserido com sucesso', item: itemInserido };
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            console.error('Erro: Chave primária duplicada. O registro já existe.');
            return { message: 'Erro: Chave primária duplicada. O registro já existe.' };
        } else if (e.message.includes('NOT NULL constraint failed')) {
            console.error('Erro: Um ou mais campos necessários estão em branco.');
            return { message: 'Erro: Um ou mais campos necessários estão em branco.' };
        } else {
            console.error('Ocorreu um erro:', e.message);
            return { message: `Ocorreu um erro:, ${e.message}` };
        }
    }
}

export async function excluirItem(sku) {
    try {
        const itemExiste = await con.query("SELECT sku FROM item WHERE sku = ?", [sku]);
        console.log(itemExiste)
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

export async function listarItens() {
    try {
        const query = `
        SELECT i.sku, i.nome, i.categoria, i.marca, i.preco, i.descricao, i.loc_estoque, i.peso,
        GROUP_CONCAT(DISTINCT v.tamanho) as tamanhos,
        GROUP_CONCAT(DISTINCT v.cor) as cores,
        GROUP_CONCAT(DISTINCT v.quantidade) as quantidades,
        GROUP_CONCAT(DISTINCT im.imagem_url) as imagens
        FROM item i
        LEFT JOIN variacao v ON i.sku = v.item_sku
        LEFT JOIN imagens im ON i.sku = im.item_sku
        GROUP BY i.sku, i.nome, i.categoria, i.marca, i.preco, i.descricao, i.loc_estoque, i.peso;
        `;

        const [produtos] = await con.query(query);
        console.log(produtos);
        return produtos;
    } catch (error) {
        throw new Error(`Erro ao listar produtos com variações e imagens: ${error.message}`);
    }
}

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

export async function alterarItem(sku, novosDados) {
    try {
        console.log(`Recebida solicitação para alterar item com SKU: ${sku}`);
        const comandoAtualizarItem = `UPDATE item SET nome = ?, categoria = ?, marca = ?, preco = ?, descricao = ?, loc_estoque = ?, peso = ? WHERE sku = ?`;
        await con.query(comandoAtualizarItem, [novosDados.item.nome, novosDados.item.categoria, novosDados.item.marca, novosDados.item.preco, novosDados.item.descricao, novosDados.item.loc_estoque, novosDados.item.peso, sku]);

        for (const variacao of novosDados.variacoes) {
            const comandoInserirVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES (?, ?, ?, ?)`;
            await con.query(comandoInserirVariacao, [sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        for (const imagem of novosDados.imagens) {
            const comandoInserirImagem = `INSERT INTO imagens (item_sku, imagem_url) VALUES (?, ?)`;
            await con.query(comandoInserirImagem, [sku, imagem.imagem_url]);
        }

        await con.commit();

        const [variacoesAtualizadas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [sku]);
        const [imagensAtualizadas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [sku]);

        const itemAtualizado = { ...novosDados, variacoes: variacoesAtualizadas, imagens: imagensAtualizadas };

        return { message: 'Item atualizado com sucesso', item: itemAtualizado };
    } catch (error) {
        throw new Error(`Erro ao atualizar o item: ${error.message}`);
    }
}






