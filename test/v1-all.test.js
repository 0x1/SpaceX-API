// SpaceX API Tests

const app = require("../app")
const request = require("supertest")

beforeAll((done) => {
  app.on("ready", () => {
    done()
  })
})

// 404 Test
test("It should return 404 page", () => {
  return request(app).get("/v2").then(response => {
    expect(response.statusCode).toBe(404)
  })
})

// Home Tests
test("It should return home info", () => {
  return request(app).get("/v1").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Info Tests
test("It should return company info", () => {
  return request(app).get("/v1/info").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Vehicle Tests
test("It should return all vehicle info", () => {
  return request(app).get("/v1/vehicles").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return Falcon 1 info", () => {
  return request(app).get("/v1/vehicles/falcon1").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return Falcon 9 info", () => {
  return request(app).get("/v1/vehicles/falcon9").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return Falcon Heavy info", () => {
  return request(app).get("/v1/vehicles/falconheavy").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return Dragon info", () => {
  return request(app).get("/v1/vehicles/dragon").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Launchpad Tests
test("It should return all launchpads", () => {
  return request(app).get("/v1/launchpads").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return LC-39A info", () => {
  return request(app).get("/v1/launchpads/ksc_lc_39a").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no launchpads found info", () => {
  return request(app).get("/v1/launchpads/ksc_lc_40a").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Past Launches Tests
test("It should return all past launches", () => {
  return request(app).get("/v1/launches").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return the latest launch", () => {
  return request(app).get("/v1/launches/latest").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all 2012 launches", () => {
  return request(app).get("/v1/launches?year=2012").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no 2005 launches", () => {
  return request(app).get("/v1/launches?year=2005").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return past launches in timeframe", () => {
  return request(app).get("/v1/launches?start=2011-01-20&final=2017-05-25").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no past launches in timeframe", () => {
  return request(app).get("/v1/launches?start=2005-01-20&final=2005-05-25").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all launches with core B1021", () => {
  return request(app).get("/v1/launches/cores/B1021").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no launches with core A1021", () => {
  return request(app).get("/v1/launches/cores/A1021").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all launches with cap C106", () => {
  return request(app).get("/v1/launches/caps/C106").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no launches with cap C403", () => {
  return request(app).get("/v1/launches/caps/C403").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Upcoming Launch Tests
test("It should return all upcoming launches", () => {
  return request(app).get("/v1/launches/upcoming").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all upcoming launches in 2017", () => {
  return request(app).get("/v1/launches/upcoming?year=2017").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no upcoming launches in 2016", () => {
  return request(app).get("/v1/launches/upcoming?year=2016").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all launches in the timeframe", () => {
  return request(app).get("/v1/launches/upcoming?start=2011-01-20&final=2017-05-25").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no launches in the timeframe", () => {
  return request(app).get("/v1/launches/upcoming?start=2011-01-20&final=2016-05-25").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

// Parts Tests
test("It should return all capsule info", () => {
  return request(app).get("/v1/parts/caps").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all info on C106", () => {
  return request(app).get("/v1/parts/caps/C106").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return np info on C406", () => {
  return request(app).get("/v1/parts/caps/C406").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return all core info", () => {
  return request(app).get("/v1/parts/cores").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return core info on B1021", () => {
  return request(app).get("/v1/parts/cores/B1021").then(response => {
    expect(response.statusCode).toBe(200)
  })
})

test("It should return no core info on A1021", () => {
  return request(app).get("/v1/parts/cores/A1021").then(response => {
    expect(response.statusCode).toBe(200)
  })
})
