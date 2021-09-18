const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        res.status(403).send('Not allowed, sorry my friend.')
    }
    if (req.method === 'PUT') {
        res.status(403).send('Not allowed, sorry my friend.')
    }
    if (req.method === 'DELETE') {
        res.status(403).send('Not allowed, sorry my friend.')
    }
    // Continue to JSON Server router
    next()
  })

server.listen(port);