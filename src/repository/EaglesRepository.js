import con from "./connection.js";
export async function salvarProduto(produto) {
  const {
    codigo_produto,
    marca_produto,
    nome_produto,
    preco,
    unidade,
    faturamento,
    tamanho,
    cor,
    peso,
  } = produto;

  let comando = `
    INSERT INTO produto (codigo_produto, marca_produto, nome_produto, preco, unidade, faturamento, tamanho, cor, peso) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    let resp = await con.query(comando, [
      codigo_produto,
      marca_produto,
      nome_produto,
      preco,
      unidade,
      faturamento,
      tamanho,
      cor,
      peso,
    ]);
    let info = resp[0];
    produto.id = info.insertId;
    return produto;
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    throw error;
  }
}
export async function listarProdutos() {
  let comando = `
    select *
      from produto
  `;
  let resp = await con.query(comando, []);
  let linhas = resp[0];
  return linhas;
}
export async function buscarProdutoPorPreco(preco) {
  let comando = `
    select *
    from produto
    where preco > ?
  `;
  let resp = await con.query(comando, [preco]);
  let linhas = resp[0];
  return linhas;
}

export async function removerProduto(id) {
  if (!id) {
    throw new Error('ID do produto não fornecido');
  }
  
  let comando = `
    delete from produto where codigo_produto = ?
  `;
  let resp = await con.query(comando, [id]);
  let info = resp[0];
  return info.affectedRows;
}
export async function alterarProduto(produto, id) {
  let comando = `
    update produto
    set marca_produto = ?,
        nome_produto  = ?,
        preco = ?,
        unidade = ?,
        faturamento = ?,
        tamanho = ?,
        cor = ?,
        peso = ?
    where id_produto = ?
  `;
  let resp = await con.query(comando, [
    produto.marca_produto,
    produto.nome_produto,
    produto.preco,
    produto.unidade,
    produto.faturamento,
    produto.tamanho,
    produto.cor,
    produto.peso,
    id,
  ]);
  let info = resp[0];
  return info.affectedRows;
}

export async function validarUsuarioSenha(usuario, senha) {
  // Consulta SQL para verificar se o usuário e a senha correspondem aos registros na tabela de administrador
  let comando = `
      SELECT * 
      FROM administrador 
      WHERE Usuario = ? AND Senha = ?
  `;

  try {
    // Executar a consulta SQL com os parâmetros fornecidos
    let [rows] = await con.query(comando, [usuario, senha]);

    // Verificar se o número de linhas retornadas é maior que 0, o que indica que o usuário e a senha correspondem a um registro na tabela
    if (rows.length > 0) {
      return true; // Usuário e senha válidos
    } else {
      return false; // Usuário e senha inválidos
    }
  } catch (error) {
    console.error("Erro ao validar usuário e senha:", error);
    throw error;
  }
}
