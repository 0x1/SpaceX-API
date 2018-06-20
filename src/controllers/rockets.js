
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Returns all rocket info
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({})
      .project({ _id: 0 })
      .sort({ first_flight: 1 })
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific rocket info
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({ id: ctx.params.rocket })
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
