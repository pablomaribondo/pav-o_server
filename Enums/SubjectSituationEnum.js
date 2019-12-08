const Enum = require('enum');

const subjectSituation = new Enum({
  AP: 'Aprovado',
  RM: 'Reprovado por Média',
  RF: 'Reprovado por Frequência',
  DS: 'Dispensado',
  TN: 'Teste de Nivelamento',
  CP: 'Cumpriu',
  CM: 'Cumprindo',
  NC: 'Não Cumpriu',
  CT: 'Créditos Transferidos',
  CI: 'Créditos Internos',
  MT: 'Matriculado neste Período',
  SI: 'Situação Final não Disponível',
  AE: 'Aproveitamento de Estudos e Conhecimentos Extraordinários',
  AM: 'Aprovado por Média',
});

module.exports = { subjectSituation };
