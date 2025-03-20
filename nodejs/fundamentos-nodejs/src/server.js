import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful => Sempre tem algum tipo de informação sendo salva em memory
// Stateless => Nunca salva em memory, talvez solve em arquivos ou banco de dados

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if(method === 'GET' && url === '/users') {
    const users = await database.select('users');
    return res.end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    const user = {
      id: 1,
      name,
      email
    }

    database.insert('users', user)

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
