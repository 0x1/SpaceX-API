#!/usr/bin/env node

const MongoClient = require('mongodb');
const request = require('request-promise-native').defaults({ jar: true });

const wait = (ms) => {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // Allow await for nested async functions
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    const db = client.db('spacex-api');
    const col = db.collection('launch');
    const data = await col.find({}).sort({ flight_number: 1 });

    const id = [];
    await data.forEach((launch) => {
      launch.rocket.second_stage.payloads.forEach((payload) => {
        if (payload.norad_id !== undefined && payload.norad_id.length !== 0) {
          id.push(payload.norad_id[0]);
        }
      });
    });

    await request.post('https://www.space-track.org/ajaxauth/login', {
      form: {
        identity: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
      json: true,
    });

    const start = async () => {
      await asyncForEach(id, async (num) => {
        wait(5000);
        const orbitData = await request(`https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/${num}/limit/1`);
        const orbit = JSON.parse(orbitData);

        if (orbit[0] !== undefined && orbit.length !== 0) {
          const update = {
            epoch: new Date(orbit[0].EPOCH).toISOString(),
            mean_motion: parseFloat(orbit[0].MEAN_MOTION),
            raan: parseFloat(orbit[0].RA_OF_ASC_NODE),
            semi_major_axis_km: parseFloat(orbit[0].SEMIMAJOR_AXIS),
            eccentricity: parseFloat(orbit[0].ECCENTRICITY),
            periapsis_km: parseFloat(orbit[0].PERIGEE),
            apoapsis_km: parseFloat(orbit[0].APOGEE),
            inclination_deg: parseFloat(orbit[0].INCLINATION),
            period_min: parseFloat(orbit[0].PERIOD),
          };
          console.log(`Updating...${orbit[0].OBJECT_NAME}`);
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.epoch': update.epoch } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.mean_motion': update.mean_motion } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.raan': update.raan } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.semi_major_axis_km': update.semi_major_axis_km } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.eccentricity': update.eccentricity } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.periapsis_km': update.periapsis_km } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.apoapsis_km': update.apoapsis_km } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.inclination_deg': update.inclination_deg } });
          await col.updateOne({ 'rocket.second_stage.payloads.norad_id': num }, { $set: { 'rocket.second_stage.payloads.$.orbit_params.period_min': update.period_min } });
          console.log('Updated...');
        }
      });
    };
    await start();

    console.log(`${id.length} launch orbits updated!`);
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  if (client) {
    client.close();
  }
})();
