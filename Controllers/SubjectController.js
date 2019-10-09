const login = require('../Helpers/Login');
const sessionId = require('../Helpers/SessionId');
const response = require('../response');

/**
 * Função para retornar as notas do usuário neste período
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Notas do período
 */
async function grades(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 23, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

/**
 * Função para retornar as disciplinas sendo cursadas pelo usuário neste período
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Disciplinas do período
 */
async function ongoing(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 21, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

/**
 * Função para retornar o calendário de provas do usuário deste período
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Calendário de provas
 */
async function schedule(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 22, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

/**
 * Função para retornar as disciplinas já cursadas pelo usuário
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Disciplinas cursadas
 */
async function taken(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 31, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

/**
 * Função para retornar as disciplinas a cursar do usuário
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Disciplinas a cursar
 */
async function toTake(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 32, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  grades,
  ongoing,
  schedule,
  taken,
  toTake,
};
