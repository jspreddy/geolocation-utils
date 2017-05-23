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

console.log('geo.normalizeAngle(400) =', geo.normalizeAngle(400)) // 40
```

TODO: more interesting usage example

# API

## Data structures

Name | Structure | Description
---- | ------- | ----
`LatLon` | `{lat: number, lon: number}` | lat/lon object
`LatitudeLongitude` | `{latitude: number, longitude: number}` | latitude/longitude object
`LatLonTuple` | `[number, number]` | lon/lat array (MIND THE ORDER!)
`Location` | <code>LatLon &#124; LatitudeLongitude &#124; LatLonTuple</code> | any geolocation structure

TODO: describe which applications use/support which formats

## Functions

### `toLatLon(Location) : LatLon`

Convert a location into an object with properties `lat` and `lon`.

### `toLatitudeLongitude(Location) : LatitudeLongitude`

Convert a location into an object with properties `latitude` and `longitude`

### `toLatLonTuple(Location) : LatLonTuple`

Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard

> Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!

## Constants

### `EARTH_RADIUS`

Returns the earth radius in meters: `6378137`.


## Roadmap

TODO: implement the following functions

```js
// convert various formats of latitude/longitude pairs

function distanceTo(from: Location, to: Location) : number
function angleTo(from: Location, to: Location) : number
function angleAndDistanceTo (from: Location, to: Location) : {angle: number, distance: number}

function moveTo (location, distance: number, angle: number): Location
function moveTo (location, {distance: number, angle: number}): Location

// Normalize a geo location into the range:
// longitude [-180, 180)
// latitude [-90, 90]
function normalizeLocation(location: Location) : Location

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
