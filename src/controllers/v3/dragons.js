
const limit = require('../../builders/limit');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all Dragon data
   */
  all: async ctx => {
    const data = await global.db
      .collection('dragon')
      .find({})
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns one Dragon data
   */
  one: async ctx => {
    const data = await global.db
      .collection('dragon')
      .find({ id: ctx.params.capsule })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
