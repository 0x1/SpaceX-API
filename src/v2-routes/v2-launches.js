// Launches Endpoints

const express = require("express")
const v2 = express.Router()
const launch = require("../builders/launch-query")
const launch_sort = require("../builders/launch-sort")

// Return most recent launch
v2.get("/latest", (req, res, next) => {
  global.db.collection("launch_v2").find({},{"_id": 0 }).sort({"flight_number": -1}).limit(1)
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc[0])
    })
})

// All past launches filtered by any querystring
v2.get("/", (req, res, next) => {
  const query = launch.launchQuery(req)
  const sort = launch_sort.launchSort(req)
  global.db.collection("launch_v2").find(query,{"_id": 0 }).sort(sort)
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

module.exports = v2
