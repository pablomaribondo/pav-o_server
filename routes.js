const subjects = require('./Controllers/SubjectController');

async function routes(fastify) {
  fastify.get('/', (request, reply) => {
    reply.send({ healthcheck: 'Pavão' });
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/subjects/ongoing',
    handler: subjects.ongoing,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/subjects/taken',
    handler: subjects.taken,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/subjects/to-take',
    handler: subjects.toTake,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/subjects/grades',
    handler: subjects.grades,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/subjects/schedule',
    handler: subjects.schedule,
  });
}

module.exports = routes;
