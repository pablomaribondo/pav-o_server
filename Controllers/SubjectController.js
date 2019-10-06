const response = require('../response');

async function ongoing(request, reply) {
  return response.ok('ongoing', '', reply);
}

async function taken(request, reply) {
  return response.ok('taken', '', reply);
}

async function toTake(request, reply) {
  return response.ok('toTake', '', reply);
}

async function grades(request, reply) {
  return response.ok('ongoing', '', reply);
}

async function schedule(request, reply) {
  return response.ok('ongoing', '', reply);
}

module.exports = {
  ongoing,
  taken,
  toTake,
  grades,
  schedule,
};
