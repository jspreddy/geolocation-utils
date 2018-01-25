# geolocation-utils

A utility library for calculations with geolocations.

Features:

- Convert between locations formats (like `[lon, lat]` and `{lat, lng}`)
- Calculate distance and heading between locations, move a distance to a new location
- Calculate bounding box around a list with locations
- Calculate whether a location lies inside a circle, bounding box, or polygon
- Calculate the closest point of approach (CPA)
- Uses plain objects, so it plays nice with other libraries, REST API's, and is easy to serialize.

# Install

```
npm install geolocation-utils
```

# Usage

```js
import { 
  toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon 
} from 'geolocation-utils'

// convert various location formats
console.log(toLatLon([4, 51]))                        
// { lat: 51, lon: 4 }
console.log(toLatitudeLongitude({ lat: 51, lng: 4 })) 
// { latitude: 51, longitude: 4 }

// calculate the distance between locations, move to a new location
const location1 = {lat: 51, lon: 4}
const location2 = {lat: 51.001, lon: 4.001 }
console.log(headingDistanceTo(location1, location2)) 
// { 
//   heading: 32.182377166258156,  // degrees
//   distance: 131.52837683622332  // meters
// }
console.log(moveTo(location1, {heading: 32.1, distance: 131.5}))
// {
//   lat: 51.00100069207888,
//   lon: 4.000997477543457,
// }

// check whether a location is inside a circle, bounding box, or polygon
const polygon = [
  [4.03146, 51.9644],
  [4.03151, 51.9643],
  [4.03048, 51.9627],
  [4.04550, 51.9600],
  [4.05279, 51.9605],
  [4.05215, 51.9619],
  [4.04528, 51.9614],
  [4.03146, 51.9644]
]
console.log(insidePolygon([4.03324, 51.9632], polygon)) // true

// and much more: 
// - calculate bounding boxes around a list of locations,
// - calculate the closest point of approach of two moving objects, 
// - etc...
```


# API

## Data structures

Name                    | Structure                                                 | Description
----------------------- | --------------------------------------------------------- | --------------------------------------
`LatLon`                | `{lat: number, lon: number}`                              | lat/lon object
`LatLng`                | `{lat: number, lng: number}`                              | lat/lng object
`LatitudeLongitude`     | `{latitude: number, longitude: number}`                   | latitude/longitude object
`LonLatTuple`           | `[longitude: number, latitude: number]`                   | array with two entries: lon, lat (MIND THE ORDER!)
`Location`              | `LatLon`, `LatLng`, `LatitudeLongitude`, or `LonLatTuple` | any geolocation structure
`BoundingBox`           | `{[topLeft: Location, bottomRight: Location]}`            | top left and bottom right locations describing a bounding box
`HeadingDistance`       | `{heading: number, distance: number}`                     | object containing a property `heading` in degrees, and `distance` in meters
`LocationHeadingSpeed`  | `{location: Location, speed: number, heading: number}`    | object containing a location, a `heading` in degrees, and a `speed` in meters per second
`TimeDistance`          | `{time: number, distance: number}`                        | object containing a `time` in seconds and a `distance` in meters

## Conversions

### `createLocation(latitude: number, longitude: number, type: string) : Location`

Create a location object of a specific type. 
Available types: `'LonLatTuple'`, `'LatLon'`, `'LatLng'`, `'LatitudeLongitude'`.

```js
createLocation(51, 4, 'LatLon') // {lat: 51, lon: 4}
```

### `getLatitude(location: Location) : LatLng`

Get the latitude of a location

```js
getLatitude({lat: 51, lon: 4}) // 51
```

### `getLocationType(location: Location) : string`

Get the type of a location object. Returns the type of the location object.
Recognized types: `'LonLatTuple'`, `'LatLon'`, `'LatLng'`, `'LatitudeLongitude'`.

```js
getLocationType({lat: 51, lon: 4}) // 'LatLon'
```

### `getLongitude(location: Location) : LatLng`

Get the longitude of a location

```js
getLongitude({lat: 51, lon: 4}) // 4
```

### `isLatLon(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `lat` and `lon`.

```js
isLatLon({lat: 51, lon: 4})            // true
isLatLon({latitude: 51, longitude: 4}) // false
```

### `isLatLng(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `lat` and `lng`.

```js
isLatLng({lat: 51, lng: 4})            // true
isLatLng({latitude: 51, longitude: 4}) // false
```

### `isLatitudeLongitude(object: Location) : boolean`

Test whether an `object` is an object containing numeric properties `latitude` and `longitude`.

```js
isLatitudeLongitude({latitude: 51, longitude: 4}) // true
isLatitudeLongitude({lat: 51, lon: 4})            // false
```

### `isLonLatTuple(object: Location) : boolean`

Test whether an `object` is an array containing two numbers (longitude and latitude).

```js
isLonLatTuple([4, 51])                      // true
isLonLatTuple({latitude: 51, longitude: 4}) // false
```

### `toLatLng(location: Location) : LatLng`

Convert a location into an object with properties `lat` and `lng`.

```js
toLatLng([4, 51])                      // {lat: 51, lng: 4}
toLatLng({latitude: 51, longitude: 4}) // {lat: 51, lng: 4}
```

### `toLatLon(location: Location) : LatLon`

Convert a location into an object with properties `lat` and `lon`.

```js
toLatLon([4, 51])                      // {lat: 51, lon: 4}
toLatLon({latitude: 51, longitude: 4}) // {lat: 51, lon: 4}
```

### `toLatitudeLongitude(location: Location) : LatitudeLongitude`

Convert a location into an object with properties `latitude` and `longitude`

```js
toLatitudeLongitude([4, 51])           // {latitude: 51, longitude: 4}
toLatitudeLongitude({lat: 51, lon: 4}) // {latitude: 51, longitude: 4}
```

### `toLonLatTuple(location: Location) : LonLatTuple`

Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard

> Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!

```js
toLonLatTuple({latitude: 51, longitude: 4})   // [4, 51]
toLonLatTuple({lat: 51, lon: 4})              // [4, 51]
```

## Calculations

### `average(locations: Location[]): Location | null`

Calculate the average of a list with locations. Returns `null` when the input is an empty Array or no Array. Returned Location format is the same as the format of the first entry of `locations`. The array can contain mixed content.

```js
const locations = [
  {lat: 51.01, lon: 4.00},
  {lat: 51.08, lon: 4.01},
  {lat: 51.09, lon: 4.02}
]
average(locations)   // {lat: 51.06, lon: 4.01}
```

### `headingDistanceTo (from: Location, to: Location) : HeadingDistance`

Calculate the heading and distance between two locations. Returns an object with a property `heading` in degrees, and a property `distance` in meters.

```js
headingDistanceTo({lat: 51, lon: 4}, {lat: 51.0006, lon: 4.001})
// { 
//   distance: 96.7928594737802,  // meters
//   heading:  46.3657229580657   // degrees
// }
```

### `headingTo(from: Location, to: Location) : number`

Calculate the heading from one location to another location. Returns an heading in degrees.

```js
headingTo({lat: 51, lon: 4}, {lat: 51.0006, lon: 4.001}) 
// 46.3657229580657 degrees
```

### `distanceTo(from: Location, to: Location) : number`

Calculate the distance between two locations. Returns a distance in meters.

```js
distanceTo({lat: 51, lon: 4}, {lat: 51.0006, lon: 4.001}) 
// 96.7928594737802 meters
```

### `getBoundingBox(locations: Location[], margin = 0): BoundingBox`

Get the bounding box of a list with locations, optionally with an extra margin around it in meters. Returns a `BoundingBox` with topLeft and bottomRight location.

```js
const locations = [
  {lat: 50, lon: 10}, 
  {lat: 40, lon: 40},
  {lat: 30, lon: 20}
]
getBoundingBox(locations) 
// {
//   topLeft:     {lat: 50, lon: 10}, 
//   bottomRight: {lat: 30, lon: 40}
// }

const margin = 10000 // meters
getBoundingBox(locations, margin)
// { 
//   topLeft:     { lat: 50.08983152841195, lon: 9.860246950846237 },
//   bottomRight: { lat: 29.910168471588047, lon: 40.10372851422071 } 
// }
```

### `insideBoundingBox(location: Location, boundingBox: BoundingBox): boolean`

Test whether a location lies inside a given bounding box. 
Returns `true` when the location is inside the bounding box or on the edge.
The function is resilient against mixing up locations of the bounding boxes' `topLeft` and `bottomRight` location.

```js
const boundingBox = {
  topLeft:     {lat: 20, lon: 0}, 
  bottomRight: {lat: 0, lon: 10}
}

insideBoundingBox({lat: 15, lon: 5}, boundingBox) // true 
insideBoundingBox({lat: 20, lon: 5}, boundingBox) // true
insideBoundingBox({lat: 21, lon: 5}, boundingBox) // false
```

### `insideCircle(location: Location, center: Location, radius: number) : boolean`

Test whether a location lies inside a circle defined by a center location and a radius in meters. 
Returns `true` when the location is inside the circle or on the edge.

```js
const center = {lat: 51, lon: 4}
const radius = 10000 // meters

insideCircle({lat: 51.03, lon: 4.05}, center, radius) // true
insideCircle({lat: 51.3, lon: 4.5}, center, radius)   // false
```

### `insidePolygon(location: Location, polygon: Location[]) : boolean`

Test whether a location lies inside a given polygon
Returns `true` when the location is inside the polygon or on the edge.

```js
// an L shaped area in the port of rotterdam
const polygon = [
  [4.031467437744141, 51.96441845630598],
  [4.031510353088379, 51.96431268689964],
  [4.03048038482666,  51.962779002459634],
  [4.045500755310059, 51.96000237127137],
  [4.052796363830566, 51.960557711268194],
  [4.052152633666992, 51.96198569681285],
  [4.045286178588867, 51.96140393041545],
  [4.031467437744141, 51.96441845630598]
]

insidePolygon([4.033248424530029, 51.963294643601216], polygon)           // true
insidePolygon({lon: 4.033248424530029, lat: 51.963294643601216}, polygon) // true
insidePolygon([4.04545783996582, 51.961668370622995], polygon)            // false
```

### `moveTo(from: Location, headingDistance: HeadingDistance): Location`

Move to a new location from a start location, heading (in degrees), and distance (in meters).

```js
moveTo({lat: 51, lon: 4}, {distance: 100 /*meter*/, heading: 45})
// { lat: 51.000635204829045, lon: 4.00100935046453 }
```

### `cpa(track1: LocationHeadingSpeed, track2: LocationHeadingSpeed) : TimeDistance`

Calculate the closest point of approach (CPA) for two moving objects, for example two ships or cars.
Both tracks contain a `location`, `speed` in meters per second, and `heading` in degrees. 
The returned result contains the time and distance of the moment when the two moving objects are closest.
The `time` in seconds and distance in `meters`.

```js
// the following two ships are near each other and closing in
const ship1 = {
  location: {lon: 4.61039, lat: 51.70401},
  speed: 5,     // meters/second
  heading: 200  // degrees
}

const ship2 = {
  location: {lon: 4.60109, lat: 51.69613},
  speed: 0.8334,  // meters/second
  heading: 180   // degrees
}

// lets see how close these ships will get and when they are closest
const { time, distance } = cpa(ship1, ship2)
// time     = 251.22255125913932 seconds
// distance = 231.90976012822378 meters
```

## Normalization

### `normalizeHeading(heading: number) : number`

Normalize a heading in degrees into the range `[0, 360)` (lower bound included, upper bound excluded).

```js
normalizeHeading(45)  // 45 degrees
normalizeHeading(-40) // 320 degrees
normalizeHeading(380) // 20 degrees
```

### `normalizeLatitude(latiude: number) : number`

Normalize a latitude into the range `[-90, 90]` (upper and lower bound included). For example a latitude of `91` is normalized into `89` (crossed the pool one degree).

```js
normalizeLatitude(45)   // 45 degrees
normalizeLatitude(91)   // 89 degrees
normalizeLatitude(-180) // 0 degrees
```

### `normalizeLongitude(longitude: number) : number`

Normalize a longitude into the range `(-180, 180]` (lower bound excluded, upper bound included).

```js
normalizeLongitude(120)  // 120 degrees
normalizeLongitude(200)  // -160 degrees
normalizeLongitude(-720) // 0 degrees
```

### `normalizeLocation(location: Location): Location`

Normalize the longitude and latitude of a location.
Latitude will be in the range `[-90, 90]` (upper and lower bound included).
Lontitude will be in the range (-180, 180] (lower bound excluded, upper bound included).

```js
normalizeLocation([360, 95]) // [ 0, 85 ] degrees
```

## Units

### `degToRad(angle: number) : number`

Convert an angle in degrees into an angle in radians.

```js
degToRad(45) // 0.7853981633974483 radians
```

### `radToDeg(angle: number) : number`

Convert an angle in radians into an angle in degrees.

```js
radToDeg(Math.PI / 4) // 45 degrees 
```

### `knotsToMeterPerSecond(knots: number) : number`

Convert a speed in knots into a speed in meter per second.
1 knot is 0.514444 m/s.

```js
knotsToMeterPerSecond(10) // 5.14444 m/s
```

### `meterPerSecondToKnots(meterPerSecond: number) : number`

Convert a speed in meter per second into a speed in knots.
1 knot is 0.514444 m/s.

```js
meterPerSecondToKnots(10) // 19.438461717893492 knots
```

### `knotsToKmPerHour(knots: number) : number`

Convert a speed in knots into a speed in kilometer per hour.
1 knot is 1.852 kilometer per hour.

```js
knotsToKmPerHour(10) // 18.52 km/h
```

### `kmPerHourToKnots(kmPerHour: number) : number`

Convert a speed in kilometer per hour into a speed in knots.
1 knot is 1.852 kilometer per hour.
```js
knotsToKmPerHour(10) // 18.52 km/h
```

## Constants

### `EARTH_RADIUS`

Returns the earth radius in meters: `6378137`.

```js
EARTH_RADIUS  // 6378137 meters
```

# Background information

## Geographical coordinate system

The location and orientation of ships and airplaines on the globe is typically expressed in terms of longitude, latitude, and heading.

- **Longitude** (horizontal axis) is zero degrees at Greenwich, and varies from -180 degrees West to 180 degrees East.
- **Latitude** (vertical axis) is 0 degrees at the equator, and varies from -90 degrees on the South pool to 90 degrees on the North pool.
- **Heading** varies from 0 to 360 degrees. North is 0 degrees, East is 90 degrees, South is 180 degrees, and West is 270 degrees. 

![coordinate system](https://www.e-education.psu.edu/natureofgeoinfo/sites/www.e-education.psu.edu.natureofgeoinfo/files/image/long_lat.gif)

Source: [https://www.e-education.psu.edu/natureofgeoinfo/c2_p11.html](https://www.e-education.psu.edu/natureofgeoinfo/c2_p11.html)

![heading](https://i.stack.imgur.com/0ywYOm.gif)

Source: [https://aviation.stackexchange.com/a/1597](https://aviation.stackexchange.com/a/1597)

## [lat, lon] or [lon, lat]?

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

-   Update version number in `package.json`

-   Describe version number, date, and changes in `CHANGELOG.md`

-   Commit the changes, and create a tag with version number

        git add ...
        git commit -m "Released version 1.2.3"
        git push origin master
        git tag v1.2.3
        git push --tags
    
-   Publish the library

        npm publish

    Before publishing, the library will be built and the unit tests will run.


# License

MIT
