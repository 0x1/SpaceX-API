// Parts Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const cores = require('../builders/core-query');
const caps = require('../builders/capsule-query');

const v2 = express.Router();

// Returns all capsule information
v2.get('/caps', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('capsule')
    .find(caps.capsuleQuery(req))
    .project({ _id: 0 })
    .sort({ original_launch: 1 })
    .toArray();
  res.json(data);
}));

// Returns specific capsule information
v2.get('/caps/:cap', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('capsule')
    .find({ capsule_serial: req.params.cap })
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
}));

// Returns all core information
v2.get('/cores', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('core')
    .find(cores.coreQuery(req))
    .project({ _id: 0 })
    .sort({ original_launch: 1 })
    .toArray();
  res.json(data);
}));

// Returns specific core information
v2.get('/cores/:core', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('core')
    .find({ core_serial: req.params.core })
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
}));

module.exports = v2;
