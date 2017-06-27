import test from 'ava'
import * as geo from '../src/index'

test ('index contains all functions of the library', t => {
  const allFunctions = [ 
    'degToRad',
    'radToDeg',
    'knotsToMeterPerSecond',
    'meterPerSecondToKnots',
    'knotsToKmPerHour',
    'kmPerHourToKnots',

    'EARTH_RADIUS',
    'isLatLon',
    'isLatLng',
    'isLatitudeLongitude',
    'isLonLatTuple',
    'getLocationType',
    'createLocation',
    'toLatLon',
    'toLatLng',
    'toLatitudeLongitude',
    'toLonLatTuple',
    'getLongitude',
    'getLatitude',
    'moveTo',
    'headingDistanceTo',
    'headingTo',
    'distanceTo',
    'insideBoundingBox',
    'insidePolygon',
    'insideCircle',
    'normalizeHeading',
    'normalizeLatitude',
    'normalizeLongitude',
    'normalizeLocation',
    'average',
    'getBoundingBox',

    'cpa',
  ]

  t.deepEqual(Object.keys(geo).sort(), allFunctions.sort())
})
