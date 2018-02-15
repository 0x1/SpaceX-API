
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                    Upcoming Launches V2
//------------------------------------------------------------

test('It should return all upcoming launches', () => {
  return request(app.listen()).get('/v2/launches/upcoming').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', expect.anything());
      expect(item).toHaveProperty('launch_year');
      expect(item).toHaveProperty('launch_date_unix');
      expect(item).toHaveProperty('launch_date_utc');
      expect(item).toHaveProperty('launch_date_local');
      expect(item).toHaveProperty('rocket.rocket_id');
      expect(item).toHaveProperty('rocket.rocket_name');
      expect(item).toHaveProperty('rocket.rocket_type');
      expect(item.rocket.first_stage.cores.length).toBeGreaterThan(0);
      item.rocket.first_stage.cores.forEach((core) => {
        expect(core).toHaveProperty('core_serial');
        expect(core).toHaveProperty('flight');
        expect(core).toHaveProperty('block');
        expect(core).toHaveProperty('reused');
        expect(core).toHaveProperty('land_success');
        expect(core).toHaveProperty('landing_type');
        expect(core).toHaveProperty('landing_vehicle');
      });
      expect(item.rocket.second_stage.payloads.length).toBeGreaterThan(0);
      if (item.hasOwnProperty.call('cap_serial')) {
        item.rocket.second_stage.payloads.forEach((payload) => {
          expect(payload).toHaveProperty('payload_id');
          expect(payload).toHaveProperty('reused');
          expect(payload).toHaveProperty('cap_serial');
          expect(payload.customers.length).toBeGreaterThan(0);
          expect(payload).toHaveProperty('payload_mass_kg');
          expect(payload).toHaveProperty('payload_mass_lbs');
          expect(payload).toHaveProperty('orbit');
          expect(payload).toHaveProperty('mass_returned_kg');
          expect(payload).toHaveProperty('mass_returned_lbs');
          expect(payload).toHaveProperty('flight_time_sec');
          expect(payload).toHaveProperty('cargo_manifest');
        });
      } else {
        item.rocket.second_stage.payloads.forEach((payload) => {
          expect(payload).toHaveProperty('payload_id');
          expect(payload).toHaveProperty('reused');
          expect(payload.customers.length).toBeGreaterThan(0);
          expect(payload).toHaveProperty('payload_mass_kg');
          expect(payload).toHaveProperty('payload_mass_lbs');
          expect(payload).toHaveProperty('orbit');
        });
      }
      expect(item).toHaveProperty('telemetry.flight_club');
      expect(item).toHaveProperty('reuse.core');
      expect(item).toHaveProperty('reuse.side_core1');
      expect(item).toHaveProperty('reuse.side_core2');
      expect(item).toHaveProperty('reuse.fairings');
      expect(item).toHaveProperty('reuse.capsule');
      expect(item).toHaveProperty('launch_site.site_id');
      expect(item).toHaveProperty('launch_site.site_name');
      expect(item).toHaveProperty('launch_site.site_name_long');
      expect(item).toHaveProperty('launch_success');
      expect(item).toHaveProperty('links');
      expect(item).toHaveProperty('details');
    });
  });
});
