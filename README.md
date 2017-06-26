# geolocation-utils

A utility library for calculations with geolocations.

`geolocation-utils` supports various location formats (like `[lon, lat]` and `{lat, lng}`). The library uses plain objects and arrays only. This makes it easy to interact with other libraries, REST API's, and to serialize/deserialize data for local storage.

# Install

```
npm install geolocation-utils
```

# Usage

Node.js:

```js
const geo = require('geolocation-utils')

console.log(geo.toLatLon([4, 51])) 
// { lat: 51, lon: 4 }

const point1 = {lat: 51, lon: 4}
const point2 = {lat: 51.001, lon: 4.001 }
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
`LonLatTuple` | `[longitude: number, latitude: number]` | array with two entries: lon, lat (MIND THE ORDER!)
`Location` | `LatLon`, `LatLng`, `LatitudeLongitude`, or `LonLatTuple` | any geolocation structure
`BoundingBox` | `{[topLeft: Location, bottomRight: Location]}` | top left and bottom right points describing a bounding box
`AngleDistance` | `{angle: number, distance: number}` | object containing a property `angle` in degrees, and `distance` in meters

## Conversions

### `createLocation(latitude: number, longitude: number, type: string) : Location`

Create a location object of a specific type. 
Available types: `'LonLatTuple'`, `'LatLon'`, `'LatLng'`, `'LatitudeLongitude'`.

### `getLatitude(location: Location) : LatLng`

Get the latitude of a location

### `getLocationType(location: Location) : string`

Get the type of a location object. Returns the type of the location object.
Recognized types: `'LonLatTuple'`, `'LatLon'`, `'LatLng'`, `'LatitudeLongitude'`.

### `getLongitude(location: Location) : LatLng`

Get the longitude of a location

### `isLatLon(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `lat` and `lon`.

### `isLatLng(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `lat` and `lng`.

### `isLatitudeLongitude(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `latitude` and `longitude`.

### `isLonLatTuple(object: Location) : boolean`

Test whether an `object` is an array containing two numbers (longitude and latitude).

### `toLatLng(location: Location) : LatLng`

Convert a location into an object with properties `lat` and `lng`.

### `toLatLon(location: Location) : LatLon`

Convert a location into an object with properties `lat` and `lon`.

### `toLatitudeLongitude(location: Location) : LatitudeLongitude`

Convert a location into an object with properties `latitude` and `longitude`

### `toLonLatTuple(location: Location) : LonLatTuple`

Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard

> Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!

## Calculations

### `average(locations: Location[]): Location | null`

Calculate the average of a list with locations. Returns `null` when the input is an empty Array or no Array. Returned Location format is the same as the format of the first entry of `locations`. The array can contain mixed content.

### `angleAndDistanceTo (from: Location, to: Location) : AngleDistance`

Calculate the angle and distance between two locations. Returns an object with a property `angle` in degrees, and a property `distance` in meters.

### `angleTo(from: Location, to: Location) : number`

Calculate the angle from one location to another location. Returns an angle in degrees.

### `distanceTo(from: Location, to: Location) : number`

Calculate the distance between two locations. Returns a distance in meters.

### `getBoundingBox(locations: Location[], margin = 0): BoundingBox`

Get the bounding box of a list with locations, optionally with an extra margin around it in meters. Returns a `BoundingBox` with topLeft and bottomRight location.

### `moveTo(center: Location, angleDistance: AngleDistance): Location`

Move to a new location from a start location, angle (in degrees), and distance (in meters).

## Normalization

### `normalizeAngle(angle: number) : number`

Normalize an angle in degrees into the range `[0, 360)` (lower bound included, upper bound excluded).

### `normalizeLatitude(latiude: number) : number`

Normalize a latitude into the range `[-90, 90]` (upper and lower bound included). For example a latitude of `91` is normalized into `89` (crossed the pool one degree).

### `normalizeLongitude(longitude: number) : number`

Normalize a longitude into the range `(-180, 180]` (lower bound excluded, upper bound included).

### `normalizeLocation(location: Location): Location`

Normalize the longitude and latitude of a location.
Latitude will be in the range `[-90, 90]` (upper and lower bound included).
Lontitude will be in the range (-180, 180] (lower bound excluded, upper bound included).

## Units

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

// ------------------------------ bounding box ------------------------------

function insideBoundingBox(location: Location, boundingBox: BoundingBox) : boolean
function insidePolygon(location: Location, polygon: Location[]) : boolean
function insideCircle(location: Location, center: Location, radiusInMeter: number) : boolean

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

Category        | [lon, lat]                                              | [lat, lon]
--------------- | ------------------------------------------------------- | -------------------------------------
formats         | GeoJSON, KML, Shapefile, WKT,  WKB, geobuf              | GeoRSS, Encoded Polylines (Google)
javascript apis | OpenLayers, d3, ArcGIS API for JavaScript, Mapbox GL JS | Leaflet, Google Maps API
mobile apis     | Tangram ES                                              | Google Maps iOS/Android, Apple MapKit
misc            | OSRM, MongoDB, Redis                                    |

The `geolocation-utils` library supports the `[lon, lat]` format.

To prevent issues in this regard, it is safest to use an object instead of an array. There are various options:

```
{latitude: 51.9280573, longitude: 4.4203587} // HTML5 geolocation API
{lat: 51.9280573, lon: 4.4203587}
{lat: 51.9280573, lng: 4.4203587}            // Leaflet, MongoDB, and Google Maps
```

TODO: write out which object stucture are supported by which libraries exactly


# Build

To generate ES5 code in the `lib` folder, run:

```
npm run build
```

TODO: create a bundle for browser usage


# Test

To test the library (using Ava), run:

```
npm test 
```

To automatically re-test on change of source code, run:

```
npm test -- --watch
```


# Publish 

- Update version number in `package.json`

- Describe version number, date, and changes in `CHANGELOG.md`

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
