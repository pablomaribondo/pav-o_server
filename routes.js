const subjects = require('./Controllers/SubjectController');

async function routes(fastify) {
  fastify.get('/', (request, reply) => {
    reply.send({ healthcheck: 'Pavão' });
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
    url: '/api/v1/grad-student/subjects/grades',
    handler: subjects.grades,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/grad-student/subjects/pending',
    handler: subjects.pending,
  });

  fastify.route({
    method: 'GET',
    url: '/api/v1/grad-student/subjects/schedule',
    handler: subjects.schedule,
  });
}

module.exports = routes;
