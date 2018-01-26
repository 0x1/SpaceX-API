<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.redd.it/8jkukgakvq801.jpg)

# SpaceX Data REST API

[![Travis](https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square)](https://travis-ci.org/r-spacex/SpaceX-API)
[![Docker Build Statu](https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?style=flat-square)](https://hub.docker.com/r/jakewmeyer/spacex-api/)
[![GitHub release](https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?style=flat-square)]()
[![Interface](https://img.shields.io/badge/interface-REST-brightgreen.svg?style=flat-square)]()

### Open Source REST API for data regarding company info, vehicles, launch sites, and launch data.
<br></br>

</div>

## Documentation
See the [Wiki](https://github.com/r-spacex/SpaceX-API/wiki) for full API Documentation

## Usage / Endpoints

**Example Response**

```http
GET https://api.spacexdata.com/v2/launches/latest
```

```json
{
   "flight_number":53,
   "launch_year":"2018",
   "launch_date_unix":1515373200,
   "launch_date_utc":"2018-01-08T01:00:00Z",
   "launch_date_local":"2018-01-07T20:00:00-05:00",
   "rocket":{
      "rocket_id":"falcon9",
      "rocket_name":"Falcon 9",
      "rocket_type":"FT",
      "first_stage":{
         "cores":[
            {
               "core_serial":"B1043",
               "reused":false,
               "land_success":true,
               "landing_type":"RTLS",
               "landing_vehicle":"LZ-1"
            }
         ]
      },
      "second_stage":{
         "payloads":[
            {
               "payload_id":"ZUMA",
               "reused":false,
               "customers":[
                  "Northrop Grumman"
               ],
               "payload_type":"Satellite",
               "payload_mass_kg":null,
               "payload_mass_lbs":null,
               "orbit":"LEO"
            }
         ]
      }
   },
   "telemetry":{
      "flight_club":"https://www.flightclub.io/result?code=ZUMA"
   },
   "reuse":{
      "core":false,
      "side_core1":false,
      "side_core2":false,
      "fairings":false,
      "capsule":false
   },
   "launch_site":{
      "site_id":"ccafs_slc_40",
      "site_name":"CCAFS SLC 40",
      "site_name_long":"Cape Canaveral Air Force Station Space Launch Complex 40"
   },
   "launch_success":true,
   "links":{
      "mission_patch":"https://i.imgur.com/c5pL42B.png",
      "reddit_campaign":"https://www.reddit.com/r/spacex/comments/7895bo/zuma_launch_campaign_thread/",
      "reddit_launch":"https://www.reddit.com/r/spacex/comments/7oqjf0/rspacex_zuma_official_launch_discussion_updates/",
      "reddit_recovery":null,
      "reddit_media":"https://www.reddit.com/r/spacex/comments/7orksl/rspacex_zuma_media_thread_videos_images_gifs/",
      "presskit":"http://www.spacex.com/sites/spacex/files/zumapresskit.pdf",
      "article_link":null,
      "video_link":"https://www.youtube.com/watch?v=0PWu3BRxn60"
   },
   "details":"Originally planned for mid-November 2017, the mission was delayed due to test results from the fairing of another customer. First-stage booster will attempt landing at LZ-1"
}
```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/wiki/Local-Development)

## Technical Details
* API is using [Node.js](https://nodejs.org/en/) with the [Express.js](https://expressjs.com/) framework
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for unit/integration testing
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database dump included under [releases](https://github.com/r-spacex/SpaceX-API/releases)
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
