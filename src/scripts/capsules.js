#!/usr/bin/env node

/**
 * This script updates capsule missions and landing counts
 */

const MongoClient = require('mongodb');
const request = require('request-promise-native');

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const col = client.db('spacex-api').collection('capsule');
  const launch = client.db('spacex-api').collection('launch');

  const capsules = [];
  const data = await col.find({}).sort({ capsule_serial: 1 }).toArray();
  data.forEach((capsule) => {
    capsules.push(capsule.capsule_serial);
  });


  for await (const capsule of capsules) {
    const landings = await launch.countDocuments({
      upcoming: false,
      'rocket.second_stage.payloads': {
        $elemMatch: {
          cap_serial: capsule,
          flight_time_sec: { $exists: true },
        },
      },
      launch_success: true,
    });

    const missions = [];
    const launchResults = await launch.find({
      upcoming: false,
      'rocket.second_stage.payloads': {
        $elemMatch: {
          cap_serial: capsule,
        },
      },
    }).project({
      _id: 0,
      flight_number: 1,
      mission_name: 1,
    }).sort({
      flight_number: 1,
    }).toArray();

    launchResults.forEach((i) => {
      const mission = {
        name: i.mission_name,
        flight: i.flight_number,
      };
      missions.push(mission);
    });

    let reuseCount;
    if (missions.length - 1 < 0) {
      reuseCount = 0;
    } else {
      reuseCount = missions.length - 1;
    }

    // Set original launch times from top mission
    let originalLaunch = null;
    let originalLaunchUnix = null;
    if (missions.length) {
      const originalFlightNum = missions[0].flight;
      const originalFlight = await request(`https://api.spacexdata.com/v3/launches/${originalFlightNum}`, { json: true });
      originalLaunch = originalFlight.launch_date_utc;
      originalLaunchUnix = originalFlight.launch_date_unix;
    }

    console.log(capsule);
    console.log(missions);
    console.log(`Original Launch: ${originalLaunch}`);
    console.log(`Original Launch Unix: ${originalLaunchUnix}`);
    console.log(`Reuse Count: ${reuseCount}`);
    console.log(`Landings: ${landings}`);

    await col.updateOne({ capsule_serial: capsule }, {
      $set: {
        original_launch: originalLaunch,
        original_launch_unix: originalLaunchUnix,
        reuse_count: reuseCount,
        landings,
        missions,
      },
    });
  }

  if (client) {
    client.close();
  }
})();
