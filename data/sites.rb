$sites = {
  test_locations: {
    name: 'Rocket Development Facility',
    city: 'McGregor',
    state: 'Texas',
    size_acres: '4000',
    year_built: '2003',
    engines_tested: {
      engine_1: 'Merlin',
      engine_2: 'Draco'
    },
    yearly_tests: '400',
    daily_tests: '2'
  },
  launch_locations: {
    CCAFS: {
      name: 'Cape Canaveral Air Force Station',
      active: 'False',
      launchpad: 'Space Launch Complex 40',
      state: 'Florida',
      orbits_avaliable: '["LEO", "GTO", "ISS"]',
      vehicles: 'Falcon 9'
    },
    VAFB: {
      name: 'Vandenberg Air Force Base',
      active: 'True',
      launchpad: 'Space Launch Complex 4 East',
      state: 'California',
      orbits_avaliable: '["Polar", "HIO"]',
      vehicles: 'Falcon 9'
    },
    KSC: {
      name: 'Kennedy Space Center',
      active: 'True',
      launchpad: 'Launch Complex 39A',
      state: 'Florida',
      orbits_avaliable: '["LEO", "GTO", "ISS"]',
      vehicles: 'Falcon 9'
    },
    STLS: {
      name: 'South Texas Launch Site',
      active: 'False',
      launchpad: 'custom pad',
      state: 'Texas',
      orbits_avaliable: '["LEO", "GTO", "ISS"]'
    }
  }
 }
