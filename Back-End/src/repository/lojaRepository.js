//alterei aqui
import { format } from 'mysql2';
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


export async function salvarItem(item) {
    try {
        console.log('Dados recebidos para salvar:', { item });

        const dataDeInclusao = new Date();
        const dataFormatada = format(dataDeInclusao, 'yyyy-MM-dd HH:mm:ss');

        await con.beginTransaction();

        const comandoItem = `INSERT INTO item (sku, nome, categoria, marca, preco, descricao, loc_estoque, peso, dataDeInclusao) VALUES(?,?,?,?,?,?,?,?, ?)`;
        await con.query(comandoItem, [item.sku, item.nome, item.categoria, item.marca, item.preco, item.descricao, item.loc_estoque, item.peso, dataFormatada]);
        console.log('Iniciando salvamento de item no banco de dados...');

        for (const variacao of item.variacoes) {
            const comandoVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoVariacao, [item.sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        console.log('Antes do console.log("Passei aqui")');

        console.log('Número de imagens:', item.imagens.length);
        for (const imagem of item.imagens) {
            console.log('passei aqui')
            const imagemBase64 = imagem;
            console.log('Tamanho da imagem em Base64:', imagemBase64.length);
            const comandoImagem = `INSERT INTO imagens (item_sku, imagem_base64) VALUES(?, ?)`;
            console.log('Imagem a ser inserida:', { item_sku: item.sku, imagemBase64 });
            await con.query(comandoImagem, [item.sku, imagemBase64]);
        }
        console.log('Depois do console.log("Passei aqui")');

        await con.commit();

        const [variacoesInseridas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [item.sku]);
        const [imagensInseridas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [item.sku]);

        const itemInserido = { ...item, variacoes: variacoesInseridas, imagens: imagensInseridas };
        console.log('Item salvo com sucesso!');
        return { message: 'Item inserido com sucesso', item: itemInserido };
    } catch (e) {
        await con.rollback();
        console.error('Erro durante a transação:', e.message);
        return { error: `Erro durante a transação: ${e.message}` };
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
        const query = `SELECT * FROM item`;

        const [produtos] = await con.query(query);
        console.log(produtos);
        return produtos;
    } catch (error) {
        throw new Error(`Erro ao listar produtos com variações e imagens: ${error.message}`);
    }
}

export async function buscarImagem(sku) {
    try {
        const comando = `SELECT * FROM imagem WHERE sku = ?`;

        const [imagens] = await con.query("SELECT * FROM imagens WHERE item_sku = ?", [sku]);

        return imagens;
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
        console.log('Dados recebidos para alterar:', { sku, novosDados });

        const dataDeAtualizacao = new Date();
        const dataFormatada = format(dataDeAtualizacao, 'yyyy-MM-dd HH:mm:ss');

        await con.beginTransaction();

        const comandoItem = `UPDATE item SET nome=?, categoria=?, marca=?, preco=?, descricao=?, loc_estoque=?, peso=?, dataDeInclusao=? WHERE sku=?`;
        await con.query(comandoItem, [novosDados.nome, novosDados.categoria, novosDados.marca, novosDados.preco, novosDados.descricao, novosDados.loc_estoque, novosDados.peso, dataFormatada, sku]);
        console.log('Iniciando atualização de item no banco de dados...');

        const comandoRemoverVariacoes = `DELETE FROM variacao WHERE item_sku=?`;
        await con.query(comandoRemoverVariacoes, [sku]);

        for (const variacao of novosDados.variacoes) {
            const comandoVariacao = `INSERT INTO variacao (item_sku, tamanho, cor, quantidade) VALUES(?,?,?,?)`;
            await con.query(comandoVariacao, [sku, variacao.tamanho, variacao.cor, variacao.quantidade]);
        }

        const comandoRemoverImagens = `DELETE FROM imagens WHERE item_sku=?`;
        await con.query(comandoRemoverImagens, [sku]);
        
        console.log('Número de imagens:', novosDados.imagens.length);
        for (const imagem of novosDados.imagens) {
            console.log('passei aqui')
            const imagemBase64 = imagem;
            console.log('Tamanho da imagem em Base64:', imagemBase64.length);
            const comandoImagem = `INSERT INTO imagens (item_sku, imagem_base64) VALUES(?, ?)`;
            console.log('Imagem a ser inserida:', { sku: sku, imagemBase64 });
            await con.query(comandoImagem, [sku, imagemBase64]);
        }
        console.log('Depois do console.log("Passei aqui")');

        await con.commit();

        const [variacoesAtualizadas] = await con.query('SELECT * FROM variacao WHERE item_sku = ?', [sku]);
        const [imagensAtualizadas] = await con.query('SELECT * FROM imagens WHERE item_sku = ?', [sku]);

        const itemAtualizado = { ...novosDados, variacoes: variacoesAtualizadas, imagens: imagensAtualizadas };
        console.log('Item alterado com sucesso!');
        return { message: 'Item alterado com sucesso', item: itemAtualizado };
    } catch (e) {
        await con.rollback();
        console.error('Erro durante a transação:', e.message);
        return { error: `Erro durante a transação: ${e.message}` };
    }
}







