# geolocation-utils

A utility library for calculations with geolocations.

# Install

```
npm install geolocation-utils
```

# Usage

Node.js:

```js
const geo = require('geolocation-utils')

console.log(geo.toLatLon([4, 51])) // { lat: 51, lon: 4 }

const point1 = {lat: 51, lon: 4}
const point1 = {lat: 51.001, lon: 4.001 }
console.log(geo.angleAndDistanceTo(point1, point2)) 
    // { 
    //   angle: 32.1...,      // degrees
    //   distance: 131.5...   // meter
    // }
```


# API

## Data structures

Name | Structure | Description
---- | ------- | ----
`LatLon` | `{lat: number, lon: number}` | lat/lon object
`LatLng` | `{lat: number, lng: number}` | lat/lng object
`LatitudeLongitude` | `{latitude: number, longitude: number}` | latitude/longitude object
`LatLonTuple` | `[longitude: number, latitude: number]` | array with two entries: lon, lat (MIND THE ORDER!)
`Location` | `LatLon`, `LatLng`, `LatitudeLongitude`, or `LatLonTuple` | any geolocation structure
`AngleDistance` | {angle: number, distance: number}

TODO: describe which applications use/support which formats

## Conversion functions for locations

### `toLatLng(location: Location) : LatLng`

Convert a location into an object with properties `lat` and `lng`.

### `toLatLon(location: Location) : LatLon`

Convert a location into an object with properties `lat` and `lon`.

### `toLatitudeLongitude(location: Location) : LatitudeLongitude`

Convert a location into an object with properties `latitude` and `longitude`

### `toLatLonTuple(location: Location) : LatLonTuple`

Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard

> Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!

### `getLatitude(location: Location) : LatLng`

Get the latitude of a location

### `getLongitude(location: Location) : LatLng`

Get the longitude of a location

## Location transforms

### `angleTo(from: Location, to: Location) : number`

Calculate the angle from one location to another location. Returns an angle in degrees.

### `distanceTo(from: Location, to: Location) : number`

Calculate the distance between two locations. Returns a distance in meters.

### `angleAndDistanceTo (from: Location, to: Location) : AngleDistance`

Calculate the angle and distance between two locations. Returns an object with a property `angle` in degrees, and a property `distance` in meters.

### `moveTo(center: Location, angleDistance: AngleDistance): Location`

Move to a new location from a start location, angle (in degrees), and distance (in meters).

## Conversion functions for angles and speed

### `degToRad(angle: number) : number`

Convert an angle in degrees into an angle in radians.

### `radToDeg(angle: number) : number`

Convert an angle in radians into an angle in degrees.

### `knotsToMeterPerSecond(knots: number) : number`

Convert a speed in knots into a speed in meter per second.
1 knot is 0.514444 m/s.

### `meterPerSecondToKnots(meterPerSecond: number) : number`

Convert a speed in meter per second into a speed in knots.
1 knot is 0.514444 m/s.

### `knotsToKmPerHour(knots: number) : number`

Convert a speed in knots into a speed in kilometer per hour.
1 knot is 1.852 kilometer per hour.

### `kmPerHourToKnots(kmPerHour: number) : number`

Convert a speed in kilometer per hour into a speed in knots.
1 knot is 1.852 kilometer per hour.


## Constants

### `EARTH_RADIUS`

Returns the earth radius in meters: `6378137`.


## Roadmap

TODO: implement the following functions

```js
// Normalize a geo location into the range:
// longitude [-180, 180)
// latitude [-90, 90]
function normalizeLocation(location: Location) : Location

// Normalize an angle into the range [0, 360)
function normalizeAngle(angle: number) : number

// Calculate the smallest difference between two angles. Always smaller or equal to 180 degrees.
function diffAngles (angle1: number, angle2: number) : number 

// ------------------------- stats ------------------------------

function averageOfLocations (locations : Location) : Location

function averageOfAngles (angle1: number, angle2: number)


// ------------------------------ bounding box ------------------------------

function locationInsidePolygon(location: Location, boundingBox: Location[]) : boolean
function locationInsideCircle(location: Location, center: Location, radiusInMeter: number) : boolean

// calculate the smallest bounding box around a list with locations
function getBoundingBox(locations: Location[], margin): Locations[]


// utility functions to create a boundingbox?


// ------------------------------ speed, cpa, ... ------------------------------

// closet point of approach
function cpa (track1: {location: Location, speed: number}, track2: {location: Location, speed: number}) : {time: number, distance: number}


// ------------------------------ geojson ------------------------------

// utilities to convert locations to geojson?
```

TODO: background information about lat/lon vs lon/lat

# `[lat, lon]` or `[lon, lat]`?

Yeah, it has bitten you probably too. What is the correct order of a geolocation tuple? Is it `[lat, lon]` or `[lon, lat]`? Turns out... there is no right way. There is an ISO standard ([ISO 6709](https://www.wikiwand.com/en/ISO_6709)), but only half of the big geolocation software libraries adhere to this standard whilst others do the opposite. It's painful and embarrassing having to scratch your head over this out again and again. Like Shane puts it in [an answer on StackOverflow](http://stackoverflow.com/questions/7309121/preferred-order-of-writing-latitude-longitude-tuples/13579921#13579921):

> This situation has wreaked unimaginable havoc on project deadlines and programmer sanity.

A nice overview is written down by Tom Macwright in the blog [*lon lat lon lat*](http://www.macwright.org/lonlat/). Here a copy (with some additions):

Category        | [lon, lat]                                                       | [lat, lon]
--------------- | ---------------------------------------------------------------- | ----------------------------------------
formats         | GeoJSON <br>KML <br>Shapefile <br>WKT <br> WKB <br>geobuf        | GeoRSS <br>Encoded Polylines (Google)
javascript apis | OpenLayers <br>d3 <br>ArcGIS API for JavaScript <br>Mapbox GL JS | Leaflet <br>Google Maps API
mobile apis     | Tangram ES                                                       | Google Maps iOS/Android <br>Apple MapKit
misc            | OSRM <br>MongoDB <br>Redis

The `geolocation-utils` library supports the `[lon, lat]` format.

To prevent issues in this regard, it is safest to use an object instead of an array. There are various options:

```
{latitude: 51.9280573, longitude: 4.4203587} // HTML5 geolocation API
{lat: 51.9280573, lon: 4.4203587}
{lat: 51.9280573, lng: 4.4203587}            // Leaflet, MongoDB, and Google Maps
```

TODO: write out which objects are supported by which libraries


# Build

To generate ES5 code in the `lib` folder, run:

```
npm run build
```

TODO: create a bundle for browser usage


# Test

```
npm test 
```

# Publish 

- Update version number in `package.json`
- Describe version number, date, and changes in `CHANGELOG.md`
- Build and test the library
  ```
  npm run build
  npm test
  ```

- Commit the changes, and create a tag with version number
  ```
  git add ...
  git commit -m "Released version 1.2.3"
  git push origin master
  git tag v1.2.3
  git push --tags
  ```

- Publish the library
  ```
  npm publish
  ```


# License

MIT
