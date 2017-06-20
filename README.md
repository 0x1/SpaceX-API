<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/EdfIdgC.jpg)

# SpaceX json data API

[![GitHub (pre-)release](https://img.shields.io/github/release/jakewmeyer/SpaceX-API/all.svg)]()
[![Language](https://img.shields.io/badge/language-Ruby-red.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Platform](https://img.shields.io/badge/platform-REST--API-brightgreen.svg)]()

### JSON API for data about company info, vehicles, launch sites, and launch data.
<br></br>
</div>

## Usage / Endpoints
Get API info
```http
GET http://api.spacexdata.com
```

Get company info
```http
GET http://api.spacexdata.com/info
```

Get vehicle information
```http
GET http://api.spacexdata.com/vehicles/falcon9
GET http://api.spacexdata.com/vehicles/falconheavy
GET http://api.spacexdata.com/vehicles/dragon
```
Get launches by year
```http
GET http://api.spacexdata.com/launches/2017
```

Get launches in a date range
```http
GET http://api.spacexdata.com/launches/from=01-20-2011/to=01-20-2017
```

## FAQ's / Contact
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me.
* For any other questions or concerns, just shoot me an email.
