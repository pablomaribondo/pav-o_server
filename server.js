require('dotenv').config();
const cors = require('cors');

const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('./routes'));

fastify.use(cors());

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');

    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
