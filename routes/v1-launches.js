// Launches Endpoints

const express = require("express")
const v1 = express.Router()

// Get most recent launch
v1.get("/latest", (req, res) => {
  global.db.collection("launch").find({},{"_id": 0 }).sort({"flight_number": -1}).limit(1)
    .toArray((err, doc) => {
      if (err) return console.log(err)
      res.end(JSON.stringify(doc, null, 2))
    })
})

// All launches by date, year, or default to all launches
v1.get("/", (req, res) => {
  let year = req.query.year
  let start = req.query.start
  let final = req.query.final
  const site = req.query.site
  if (year) {
    global.db.collection("launch").find({"launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        if (doc.length == 0) {
          res.end("No Matches Found")
        }
        res.end(JSON.stringify(doc, null, 2))
      })
  } else if (start && final) {
    global.db.collection("launch").find({ "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (doc.length == 0) {
          res.end("No Matches Found")
        }
        res.end(JSON.stringify(doc, null, 2))
      })
  } else if (site) {
    global.db.collection("launch").find({ "launch_site.site_id": `${site}`}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (doc.length == 0) {
          res.end("No Matches Found")
        }
        res.end(JSON.stringify(doc, null, 2))
      })
  } else {
    global.db.collection("launch").find({},{"_id": 0 }).sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (err) return console.log(err)
        res.end(JSON.stringify(doc, null, 2))
      })
  }
})

// Returns launches by core serial #
v1.get("/cores/:core", (req, res) => {
  let core = req.params.core
  global.db.collection("launch").find({"core_serial": `${core}`},{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      if (doc.length == 0) {
        res.end("No Matches Found")
      }
      res.end(JSON.stringify(doc, null, 2))
    })
})

// Returns launches by capsule serial #
v1.get("/caps/:cap", (req, res) => {
  let cap = req.params.cap
  global.db.collection("launch").find({"cap_serial": `${cap}`},{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      if (doc.length == 0) {
        res.end("No Matches Found")
      }
      res.end(JSON.stringify(doc, null, 2))
    })
})

module.exports = v1
