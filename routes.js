async function routes(fastify) {
  fastify.get('/', (request, reply) => {
    reply.send({ message: 'Pavão', code: 200 });
  });
}

module.exports = routes;
