
const limit = require('../../builders/limit');
const project = require('../../builders/project');

module.exports = {

  /**
   * Return all launchpads
   */
  all: async ctx => {
    const data = await global.db
      .collection('launchpad')
      .find({})
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach(pad => {
      pad.site_id = pad.id;
      pad.id = pad.padid;
      pad.site_name_long = pad.full_name;
      delete pad.padid;
      delete pad.full_name;
    });
    ctx.body = data;
  },

  /**
   * Return specific launchpad
   */
  specific: async ctx => {
    const data = await global.db
      .collection('launchpad')
      .find({ id: ctx.params.pad })
      .project(project(ctx.request.query))
      .toArray();
    try {
      data[0].site_id = data[0].id;
      data[0].id = data[0].padid;
      data[0].site_name_long = data[0].full_name;
      delete data[0].padid;
      delete data[0].full_name;
    } catch (e) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
