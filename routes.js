const subjects = require('./Controllers/SubjectController');
const users = require('./Controllers/UserController');

async function routes(fastify) {
  fastify.get('/', (request, reply) => {
    reply.send({ healthcheck: 'Pavão' });
  });

  fastify.route({
    method: 'POST',
    url: '/api/v1/grad-student/login',
    handler: users.login,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/grad-student/subjects/coursing',
    handler: subjects.coursing,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/grad-student/subjects/covered',
    handler: subjects.covered,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/grad-student/subjects/pending',
    handler: subjects.pending,
  });
}

module.exports = routes;
