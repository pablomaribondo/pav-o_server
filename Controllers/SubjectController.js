const cheerio = require('cheerio');

const login = require('../Helpers/Login');
const sessionId = require('../Helpers/SessionId');
const response = require('../response');

/**
 * Função para retornar as disciplinas sendo cursadas pelo usuário neste período
 * @param {Object} request - Pedido do cliente
 * @param {Reply} reply - Resposta para o cliente
 * @returns {Object} Disciplinas do período
 */
async function coursing(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse.suffixUrl}`;
    const coursingResponse = await sessionId.getWithRoutine(url, data, 21, reply);

    const $ = cheerio.load(coursingResponse.body);

    const subjectsTable = $('tbody')
      .eq(1)
      .children();

    const subjectsAmount = subjectsTable.length;

    const coursingSubjects = [];

    for (let index = 1; index < subjectsAmount - 1; index += 1) {
      coursingSubjects.push({
        code: subjectsTable
          .eq(index)
          .children()
          .eq(0)
          .text()
          .trim(),
        name: subjectsTable
          .eq(index)
          .children()
          .eq(1)
          .text()
          .trim(),
        class: subjectsTable
          .eq(index)
          .children()
          .eq(2)
          .text()
          .trim(),
        room: subjectsTable
          .eq(index)
          .children()
          .eq(3)
          .text()
          .trim(),
        schedule: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        workload: subjectsTable
          .eq(index)
          .children()
          .eq(5)
          .text()
          .trim(),
        credits: subjectsTable
          .eq(index)
          .children()
          .eq(6)
          .text()
          .trim(),
        period: subjectsTable
          .eq(index)
          .children()
          .eq(7)
          .text()
          .trim(),
      });
    }

    return response.ok({ coursingSubjects }, null, reply);
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
async function covered(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse.suffixUrl}`;
    const coveredResponse = await sessionId.getWithRoutine(url, data, 31, reply);

    const $ = cheerio.load(coveredResponse.body);

    const subjectsTable = $('tbody')
      .eq(1)
      .children();

    const subjectsAmount = subjectsTable.length;

    const coveredSubjects = [];

    for (let index = 1; index < subjectsAmount; index += 1) {
      coveredSubjects.push({
        period: subjectsTable
          .eq(index)
          .children()
          .eq(0)
          .text()
          .trim(),
        code: subjectsTable
          .eq(index)
          .children()
          .eq(1)
          .text()
          .trim(),
        name: subjectsTable
          .eq(index)
          .children()
          .eq(2)
          .text()
          .trim(),
        averageGrade: subjectsTable
          .eq(index)
          .children()
          .eq(3)
          .text()
          .trim(),
        situation: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
      });
    }

    return response.ok({ coveredSubjects }, null, reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

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

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse.suffixUrl}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 23, reply);

    const $ = cheerio.load(gradesResponse.body);

    const coefficientsTable = $('tbody')
      .eq(1)
      .children();

    const coefficients = {
      course: coefficientsTable
        .eq(0)
        .children()
        .eq(1)
        .text()
        .trim(),
      lastPeriod: coefficientsTable
        .eq(0)
        .children()
        .eq(3)
        .text()
        .trim(),
    };

    const subjectsTable = $('tbody')
      .eq(2)
      .children();

    const subjectsAmount = subjectsTable.length;

    const subjectsGrades = [];

    for (let index = 1; index < subjectsAmount; index += 1) {
      subjectsGrades.push({
        code: subjectsTable
          .eq(index)
          .children()
          .eq(0)
          .text()
          .trim(),
        name: subjectsTable
          .eq(index)
          .children()
          .eq(1)
          .text()
          .trim(),
        class: subjectsTable
          .eq(index)
          .children()
          .eq(2)
          .text()
          .trim(),
        firstGrade: subjectsTable
          .eq(index)
          .children()
          .eq(3)
          .text()
          .trim(),
        secondGrade: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        averageGrade: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        finalGrade: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        finalAverageGrade: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        finalSituation: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
      });
    }

    return response.ok({ coefficients, subjectsGrades }, null, reply);
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
async function pending(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await login.get(data, reply);

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse.suffixUrl}`;
    const pendingResponse = await sessionId.getWithRoutine(url, data, 32, reply);

    const $ = cheerio.load(pendingResponse.body);

    const subjectsTable = $('tbody')
      .eq(1)
      .children();

    const subjectsAmount = subjectsTable.length;

    const pendingSubjects = [];

    for (let index = 1; index < subjectsAmount; index += 1) {
      pendingSubjects.push({
        period: subjectsTable
          .eq(index)
          .children()
          .eq(0)
          .text()
          .trim(),
        code: subjectsTable
          .eq(index)
          .children()
          .eq(2)
          .text()
          .trim(),
        name: subjectsTable
          .eq(index)
          .children()
          .eq(4)
          .text()
          .trim(),
        credits: subjectsTable
          .eq(index)
          .children()
          .eq(5)
          .text()
          .trim(),
        workload: subjectsTable
          .eq(index)
          .children()
          .eq(6)
          .text()
          .trim(),
      });
    }

    return response.ok({ pendingSubjects }, null, reply);
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

    const url = `${process.env.COLLEGE_LOGIN_URL}${loggedInResponse.suffixUrl}`;
    const gradesResponse = await sessionId.getWithRoutine(url, data, 22, reply);

    return response.ok(gradesResponse.data, '', reply);
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  coursing,
  covered,
  grades,
  pending,
  schedule,
};
