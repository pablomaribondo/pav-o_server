async function ok(values, message, reply) {
  const statusCode = 200;

  return reply
    .code(statusCode)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: statusCode,
      values,
      message,
    });
}

async function badRequest(values, message, reply) {
  const statusCode = 400;

  return reply
    .code(statusCode)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: statusCode,
      values,
      message,
    });
}

async function internalServerError(values, message, reply) {
  const statusCode = 500;

  return reply
    .code(statusCode)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: statusCode,
      values,
      message,
    });
}

module.exports = {
  ok,
  badRequest,
  internalServerError,
};
