const cheerio = require('cheerio');

const loginHelper = require('../Helpers/Login');
const response = require('../response');

/**
 * Função para retornar os dados do usuário logado
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Dados do Usuário
 */
async function login(request, reply) {
  const { registration, digit, token } = request.body;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await loginHelper.get(data, reply);

    const $ = cheerio.load(loggedInResponse.body);

    const errorMessage = $('h5').text();

    if (errorMessage) {
      throw new Error(errorMessage);
    }

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
    };

    return response.ok({ userInfo }, null, reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  login,
};
