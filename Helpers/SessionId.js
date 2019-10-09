const cheerio = require('cheerio');
const got = require('got');
const querystring = require('querystring');

const response = require('../response');

/**
 * Função para retornar um JSESSIONID a partir de uma url
 * @param {string} url - Url para fazer a busca do JSESSIONID
 * @param {Reply} reply - Resposta para o cliente
 * @returns {string} Sufixo da url com um JSESSIONID válido
 */
async function get(url, reply) {
  try {
    const { body } = await got.get(url);

    const $ = cheerio.load(body);
    const suffixUrl = $('form').attr('action');

    return suffixUrl;
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

/**
 * Função para retornar um JSESSIONID a partir de uma url e uma rotina
 * @param {string} url - Url para fazer a busca do JSESSIONID
 * @param {Object} request - Objeto contendo a matrícula, dígito e senha do usuário
 * @param {number} routine - Número que define o que será retornado do site
 * @param {Reply} reply - Resposta para o cliente
 * @returns {string} Sufixo da url com um JSESSIONID válido
 */
async function getWithRoutine(url, request, routine, reply) {
  const data = querystring.stringify({
    rotina: routine,
    Matricula: request.registration,
    Digito: request.digit,
    Senha: request.token,
  });

  try {
    const { body } = await got.post(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    const $ = cheerio.load(body);
    const suffixUrl = $('form').attr('action');

    return suffixUrl;
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  get,
  getWithRoutine,
};
