const cheerio = require('cheerio');

const loginHelper = require('../Helpers/Login');
const sessionId = require('../Helpers/SessionId');
const { subjectSituation } = require('../Enums/SubjectSituationEnum');
const response = require('../response');

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
    const loggedInResponse = await loginHelper.get(data, reply);

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
        situation: subjectSituation.get(
          subjectsTable
            .eq(index)
            .children()
            .eq(4)
            .text()
            .trim()
        ).value,
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
async function grades(request, suffixUrl, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const url = `${process.env.COLLEGE_LOGIN_URL}${suffixUrl}`;
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
          .eq(5)
          .text()
          .trim(),
        finalGrade: subjectsTable
          .eq(index)
          .children()
          .eq(6)
          .text()
          .trim(),
        finalAverageGrade: subjectsTable
          .eq(index)
          .children()
          .eq(7)
          .text()
          .trim(),
        finalSituation: subjectsTable
          .eq(index)
          .children()
          .eq(8)
          .text()
          .trim(),
      });
    }

    return { coefficients, subjectsGrades };
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
    const loggedInResponse = await loginHelper.get(data, reply);

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
async function schedule(request, suffixUrl, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const url = `${process.env.COLLEGE_LOGIN_URL}${suffixUrl}`;
    const scheduleResponse = await sessionId.getWithRoutine(url, data, 22, reply);

    const $ = cheerio.load(scheduleResponse.body);

    const subjectsTable = $('tbody')
      .eq(1)
      .children();

    const subjectsAmount = subjectsTable.length;

    const subjectsSchedule = [];

    for (let index = 2; index < subjectsAmount; index += 1) {
      subjectsSchedule.push({
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
        firstGrade: {
          firstExame: subjectsTable
            .eq(index)
            .children()
            .eq(3)
            .text()
            .trim(),
          secondExame: subjectsTable
            .eq(index)
            .children()
            .eq(4)
            .text()
            .trim(),
        },
        secondGrade: {
          firstExame: subjectsTable
            .eq(index)
            .children()
            .eq(5)
            .text()
            .trim(),
          secondExame: subjectsTable
            .eq(index)
            .children()
            .eq(6)
            .text()
            .trim(),
        },
        finalGrade: subjectsTable
          .eq(index)
          .children()
          .eq(7)
          .text()
          .trim(),
      });
    }

    return { subjectsSchedule };
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
async function coursing(request, reply) {
  const { registration, digit, token } = request.headers;
  const data = { registration, digit, token };

  try {
    const loggedInResponse = await loginHelper.get(data, reply);

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

    const suffixUrl = $('form').attr('action');

    const coursingGrades = await grades(request, suffixUrl, reply);

    const coursingWithGrades = coursingSubjects.map(subject => ({
      ...subject,
      grades: coursingGrades.subjectsGrades.find(
        gradeElement => subject.code === gradeElement.code
      ),
    }));

    const coursingSchedule = await schedule(request, suffixUrl, reply);

    const coursingWithSchedule = coursingWithGrades.map(subject => ({
      ...subject,
      examSchedule: coursingSchedule.subjectsSchedule.find(
        scheduleElement => subject.code === scheduleElement.code
      ),
    }));

    const formatedCoursingSubjects = coursingWithSchedule.map(subject => {
      return {
        code: subject.code,
        name: subject.name,
        class: subject.class,
        room: subject.room,
        schedule: subject.schedule,
        workload: subject.workload,
        credits: subject.credits,
        period: subject.period,
        examSchedule: {
          firstGrade: {
            firstExame: subject.examSchedule.firstGrade.firstExame,
            secondExame: subject.examSchedule.firstGrade.secondExame,
          },
          secondGrade: {
            firstExame: subject.examSchedule.secondGrade.firstExame,
            secondExame: subject.examSchedule.secondGrade.secondExame,
          },
          finalGrade: subject.examSchedule.finalGrade,
        },
        grades: {
          firstGrade: subject.grades.firstGrade,
          secondGrade: subject.grades.secondGrade,
          averageGrade: subject.grades.averageGrade,
          finalGrade: subject.grades.finalGrade,
          finalAverageGrade: subject.grades.finalAverageGrade,
          finalSituation: subject.grades.finalSituation,
        },
      };
    });

    return response.ok(
      { coursingSubjects: formatedCoursingSubjects, coefficients: coursingGrades.coefficients },
      null,
      reply
    );
  } catch (error) {
    return response.badRequest(error.message, '', reply);
  }
}

module.exports = {
  coursing,
  covered,
  pending,
};
