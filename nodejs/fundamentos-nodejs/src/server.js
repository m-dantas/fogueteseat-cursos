import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful => Sempre tem algum tipo de informação sendo salva em memory
// Stateless => Nunca salva em memory, talvez solve em arquivos ou banco de dados

// Query Parameters: URL Stateful ⇒ Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Diego

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    
    req.params = params 
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req, res)
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
