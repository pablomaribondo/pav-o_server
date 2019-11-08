const cheerio = require('cheerio');

const login = require('../Helpers/Login');
const response = require('../response');

/**
 * Função para retornar os dados do usuário logado
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Dados do Usuário
 */
async function show(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const $ = cheerio.load(loggedInResponse.body);

    const userInfoTable = $('tbody')
      .eq(0)
      .children();

    const userInfo = {
      registration: userInfoTable
        .eq(0)
        .children()
        .eq(1)
        .text()
        .trim(),
      name: userInfoTable
        .eq(0)
        .children()
        .eq(3)
        .text()
        .trim(),
      course: userInfoTable
        .eq(1)
        .children()
        .eq(1)
        .text()
        .trim(),
    }

    return response.ok({ userInfo }, null, reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  show,
};
