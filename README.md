# geo-utils

A utility library for calculations with geo locations.

# Usage

Node.js:

```js
const geo = require('..')

console.log('geo.normalizeAngle(400) =', geo.normalizeAngle(400)) // 40
```

# API

TODO: describe and implement the API

```js
// geo utils library API

// ------------------------------ location, distance, angle ------------------------------

class Location {
  constructor (json)  // accepts {lat,lon}, {latitude,longitude}, [lon, lat]

  toLatLon() : {lat: number, lon: number}
  toLatitudeLongitude : {latitude: number, longitude: number}
  toTuple

  distanceTo(other: Location) : number
  angleTo(other: Location) : number

  moveTo (distance: number, angle: number): Location
}

// or, instead of a class, plain JSON, so we can easily store locations in localStorage 
// and feed it to Leaflet, etc:

function toLatLon(location: any) : {lat: number, lon: number}
function toLatitudeLongitude(location: any) : {latitude: number, longitude: number}
function toLatLonTuple(location: any): [lat, lon]
function toLonLatTuple(location: any): [lon, lat]

function distanceTo(from: Location, to: Location) : number
function angleTo(from: Location, to: Location) : number
function angleAndDistance (from: Location, to: Location) : {angle: number, distance: number}

function moveTo (location, distance: number, angle: number): Location
function moveTo (location, {distance: number, angle: number}): Location

// Normalize an angle into the range [0, 360)
function normalizeAngle(angle: number) : number

// Calculate the smallest difference between two angles. Always smaller or equal to 180 degrees.
function diffAngles (angle1: number, angle2: number) : number 

function degToRad (deg: number) : number
function radToDeg (rad: number) : number

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

function knotsToMeterPerSecond (knots: number): number 
function meterPerSecondToKnots (meterPerSecond: number) : number

// closet point of approach
function cpa (track1: {location: Location, speed: number}, track2: {location: Location, speed: number}) : {time: number, distance: number}


// ------------------------------ geojson ------------------------------

// utilities to convert locations to geojson?
```

# Build

To generate ES5 code in the `lib` folder, run:

```
npm install     # (once)
npm run build
```

TODO: create a bundle for browser usage


# Test

```
npm install     # (once)
npm test 
```

# License

UNLICENSED
