
const query = require('../../builders/query/core-query');
const limit = require('../../builders/limit');
const sort = require('../../builders/sort/v2-sort');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all core information
   */
  all: async ctx => {
    const data = await global.db
      .collection('core')
      .find(query(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific core information
   */
  one: async ctx => {
    const data = await global.db
      .collection('core')
      .find({ core_serial: ctx.params.core })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
