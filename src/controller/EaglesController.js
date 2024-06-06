// routes/eaglesRoutes.js

import multer from "multer";
import { salvarProduto, listarProdutos, buscarProdutoPorPreco, removerProduto, alterarProduto } from "../repository/EaglesRepository.js";
import { Router } from "express";
import { validarUsuarioSenha } from "../repository/EaglesRepository.js"

let servidor = Router();

const upload = multer({ dest: 'storage/produto' });

servidor.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
      // Validar usuário e senha
      const isValid = await validarUsuarioSenha(usuario, senha);
      
      if (isValid) {
          // Se o usuário e senha forem válidos, retornar sucesso
          res.status(200).json({ mensagem: "Login bem-sucedido!" });
      } else {
          // Se o usuário e senha forem inválidos, retornar erro
          res.status(401).json({ mensagem: "Usuário e/ou senha inválidos." });
      }
  } catch (error) {
      // Se ocorrer um erro ao validar o usuário e senha, retornar erro interno do servidor
      console.error("Erro ao validar usuário e senha:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

servidor.post('/produto', async (req, resp) => {
  let produto = req.body;
  let produtoInserido = await salvarProduto(produto);
  resp.send(produtoInserido);
});

servidor.get('/produto', async (req, resp) => {
  let lista = await listarProdutos();
  resp.send(lista);
});

servidor.get('/produto/preco', async (req, resp) => {
  let preco = req.query.preco;
  let lista = await buscarProdutoPorPreco(preco);
  resp.send(lista);
});

servidor.delete('/produto/:id', async (req, resp) => {
  let id = req.params.id;
  let linhasAfetadas = await removerProduto(id);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
});

servidor.put('/produto/:id', async (req, resp) => {
  let id = req.params.id;
  let produto = req.body;
  let linhasAfetadas = await alterarProduto(produto, id);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
});

servidor.put('/produto/imagem/:id', upload.single('imagem'), async (req, resp) => {
  let id = req.params.id;
  let imagem = req.file.path;
  let linhasAfetadas = await alterarImagem(id, imagem);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
});



export default servidor;
