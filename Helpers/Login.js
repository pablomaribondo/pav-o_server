const response = require('../response');
const sessionId = require('../Helpers/SessionId');

/**
 * Função para executar o login do usuário e retornar um JSESSIONID válido
 * @param {Object} request - Objeto contendo a matrícula, dígito e senha do usuário
 * @param {Reply} reply - Resposta para o cliente
 * @returns {string} Sufixo da url com um JSESSIONID válido
 */
async function get(request, reply) {
  try {
    const loginResponse = await sessionId.get(process.env.COLLEGE_LOGIN_URL, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loginResponse.suffixUrl}`;
    const loggedInResponse = await sessionId.getWithRoutine(url, request, 1, reply);

    return loggedInResponse;
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  get,
};
