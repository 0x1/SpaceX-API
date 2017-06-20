$falcon9 = { 
  name: 'falcon 9',
  stages: '2',
  cost_per_launch: '62 million',
  first_flight: '06-04-2010',
  country: 'United States',
  company: 'SpaceX',
  height: {
    meters: '70',
    feet: '229.6'
  },
  diameter: {
    meters: '3.7',
    feet: '12'
  },
  mass: {
    kg: '549054',
    lb: '1207920'
  },
  payload_weights: {
    leo: {
      name: 'low earth orbit',
      kg: '22800',
      lb: '50265'
    },
    gto: {
      name: 'geosynchronous transfer orbit',
      kg: '8300',
      lb: '18300'
    },
    mars: {
      name: 'mars orbit',
      kg: '4020',
      lb: '8860'
    }
  },
  first_stage: {
    reusable: 'true',
    engines: '9',
    burn_time_sec: '162',
    thrust_sea_level: {
      kN: '7607',
      lbf: '1710000'
    },
    thrust_vacuum: {
      kN: '8227',
      lbf: '1849500'
    }
  },
  second_stage: {
    engines: '1',
    burn_sec_sec: '397',
    thrust: {
      kN: '934',
      lbf: '210000'
    },
    payloads: {
      option_1: 'dragon',
      option_2: 'composite fairing',
      composite: {
        height: {
          meters: '13.1',
          feet: '43'
        },
        diameter: {
          meters: '5.2',
          feet: '17.1'
        }
      }
    }
  },
  engines: {
    number: '9',
    type: 'merlin',
    version: '1D+',
    layout: 'octaweb',
    engine_loss: '2',
    propellent_1: 'oxygen',
    propellant_2: 'kerosene',
    thrust_sea_level: {
      kN: '845',
      lbf: '190000'
    },
    thrust_vacuum: {
      kN: '914',
      lbf: '205500'
    },
    thrust_to_weight: '180.1'
  },
  landing_legs: {
    number: '4',
    material: 'carbon fiber'
  },
  description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.'
 }
