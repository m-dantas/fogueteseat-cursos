import http from 'node:http';

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful => Sempre tem algum tipo de informação sendo salva em memory
// Stateless => Nunca salva em memory, talvez solve em arquivos ou banco de dados

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if(method === 'GET' && url === '/users') {
    return res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});