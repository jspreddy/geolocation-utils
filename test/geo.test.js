import test from 'ava'
import { 
  isLatLon, isLatLng, isLatitudeLongitude, isLonLatTuple,
  getLocationType, createLocation,
  toLatitudeLongitude, toLatLon, toLatLng, toLonLatTuple,
  getLatitude, getLongitude,
  radToDeg, degToRad, 
  knotsToMeterPerSecond, meterPerSecondToKnots, knotsToKmPerHour, kmPerHourToKnots,
  angleAndDistanceTo, angleTo, distanceTo, moveTo,
  normalizeAngle, normalizeLatitude, normalizeLongitude, normalizeLocation
} from '../src/geo'

test ('isLatLon', t => {
  t.is(isLatLon({lat: 0, lon: 0}), true)
  t.is(isLatLon({lat: 0, lon: 0, foo: 'bar'}), true)
  t.is(isLatLon({lat: 0, lng: 0}), false)
  t.is(isLatLon({latitude: 0, longitude: 0}), false)
  t.is(isLatLon([0, 0]), false)
  t.is(isLatLon({lat: 0, lon: 'foo'}), false)
  t.is(isLatLon({lat: 'foo', lon: 0}), false)
  t.is(isLatLon({lat: 0}), false)
  t.is(isLatLon({lon: 0}), false)
  t.is(isLatLon({}), false)
  t.is(isLatLon(2), false)
  t.is(isLatLon(null), false)
})

test ('isLatLng', t => {
  t.is(isLatLng({lat: 0, lng: 0}), true)
  t.is(isLatLng({lat: 0, lng: 0, foo: 'bar'}), true)

  t.is(isLatLng({lat: 0, lon: 0}), false)
  t.is(isLatLng({latitude: 0, longitude: 0}), false)
  t.is(isLatLng([0, 0]), false)

  t.is(isLatLng({lat: 0, lng: 'foo'}), false)
  t.is(isLatLng({lat: 'foo', lng: 0}), false)
  t.is(isLatLng({lat: 0}), false)
  t.is(isLatLng({lng: 0}), false)
  t.is(isLatLng({}), false)
  t.is(isLatLng(2), false)
  t.is(isLatLng(null), false)
})

test ('isLatitudeLongitude', t => {
  t.is(isLatitudeLongitude({latitude: 0, longitude: 0}), true)
  t.is(isLatitudeLongitude({latitude: 0, longitude: 0, foo: 'bar'}), true)

  t.is(isLatitudeLongitude({lat: 0, lon: 0}), false)
  t.is(isLatitudeLongitude({lat: 0, lng: 0}), false)
  t.is(isLatitudeLongitude([0, 0]), false)

  t.is(isLatitudeLongitude({latitude: 0, longitude: 'foo'}), false)
  t.is(isLatitudeLongitude({latitude: 'foo', longitude: 0}), false)
  t.is(isLatitudeLongitude({latitude: 0}), false)
  t.is(isLatitudeLongitude({longitude: 0}), false)
  t.is(isLatitudeLongitude({}), false)
  t.is(isLatitudeLongitude(2), false)
  t.is(isLatitudeLongitude(null), false)
})

test ('isLonLatTuple', t => {
  t.is(isLonLatTuple([0, 0]), true)
  t.is(isLonLatTuple([0, 0, 0]), true)

  t.is(isLonLatTuple({lat: 0, lon: 0}), false)
  t.is(isLonLatTuple({lat: 0, lng: 0}), false)
  t.is(isLonLatTuple({latitude: 0, longitude: 0}), false)

  t.is(isLonLatTuple([]), false)
  t.is(isLonLatTuple([0, 'foo']), false)
  t.is(isLonLatTuple(['foo', 0]), false)
  t.is(isLonLatTuple({}), false)
  t.is(isLonLatTuple(2), false)
  t.is(isLonLatTuple(null), false)
})

test ('getLocationType', t => {
  t.is(getLocationType({lat: 0, lon: 0}), 'LatLon')
  t.is(getLocationType({lat: 0, lng: 0}), 'LatLng')
  t.is(getLocationType({latitude: 0, longitude: 0}), 'LatitudeLongitude')
  t.is(getLocationType([0, 0]), 'LonLatTuple')

  t.throws(() => { getLocationType({foo: 'bar'}) }, /Unknown location format/)
  t.throws(() => { getLocationType({lat: 0}) }, /Unknown location format/)
})

test ('createLocation', t => {
  t.deepEqual(createLocation(1, 2, 'LatLon'), {lat: 1, lon: 2})
  t.deepEqual(createLocation(1, 2, 'LatLng'), {lat: 1, lng: 2})
  t.deepEqual(createLocation(1, 2, 'LatitudeLongitude'), {latitude: 1, longitude: 2})
  t.deepEqual(createLocation(1, 2, 'LonLatTuple'), [2, 1])
  
  t.throws(() => { getLocationType(0, 0, 'foo') }, /Unknown location format/)
})

test ('toLatitudeLongitude', t => {
  t.deepEqual(toLatitudeLongitude([4, 51]), {latitude: 51, longitude: 4})
  t.deepEqual(toLatitudeLongitude([0, 0]), {latitude: 0, longitude: 0})

  t.deepEqual(toLatitudeLongitude({lat: 51, lon: 4}), {latitude: 51, longitude: 4})
  t.deepEqual(toLatitudeLongitude({lat: 0, lon: 0}), {latitude: 0, longitude: 0})

  t.deepEqual(toLatitudeLongitude({lat: 51, lng: 4}), {latitude: 51, longitude: 4})
  t.deepEqual(toLatitudeLongitude({lat: 0, lng: 0}), {latitude: 0, longitude: 0})

  t.deepEqual(toLatitudeLongitude({latitude: 51, longitude: 4}), {latitude: 51, longitude: 4})
  t.deepEqual(toLatitudeLongitude({latitude: 0, longitude: 0}), {latitude: 0, longitude: 0})
  t.deepEqual(toLatitudeLongitude({latitude: 0, longitude: 0, foo: 'bar'}), {latitude: 0, longitude: 0})

  t.throws(() => { toLatitudeLongitude({foo: 'bar'}) }, /Unknown location format/)
})

test ('toLatLon', t => {
  t.deepEqual(toLatLon([4, 51]), {lat: 51, lon: 4})
  t.deepEqual(toLatLon([0, 0]), {lat: 0, lon: 0})

  t.deepEqual(toLatLon({lat: 51, lon: 4}), {lat: 51, lon: 4})
  t.deepEqual(toLatLon({lat: 0, lon: 0}), {lat: 0, lon: 0})
  t.deepEqual(toLatLon({lat: 0, lon: 0, foo: 'bar'}), {lat: 0, lon: 0})

  t.deepEqual(toLatLon({lat: 51, lng: 4}), {lat: 51, lon: 4})
  t.deepEqual(toLatLon({lat: 0, lng: 0}), {lat: 0, lon: 0})

  t.deepEqual(toLatLon({latitude: 51, longitude: 4}), {lat: 51, lon: 4})
  t.deepEqual(toLatLon({latitude: 0, longitude: 0}), {lat: 0, lon: 0})

  t.throws(() => { toLatLon({foo: 'bar'}) }, /Unknown location format/)
})

test ('toLatLng', t => {
  t.deepEqual(toLatLng([4, 51]), {lat: 51, lng: 4})
  t.deepEqual(toLatLng([0, 0]), {lat: 0, lng: 0})

  t.deepEqual(toLatLng({lat: 51, lon: 4}), {lat: 51, lng: 4})
  t.deepEqual(toLatLng({lat: 0, lon: 0}), {lat: 0, lng: 0})
  t.deepEqual(toLatLng({lat: 0, lon: 0, foo: 'bar'}), {lat: 0, lng: 0})

  t.deepEqual(toLatLng({lat: 51, lng: 4}), {lat: 51, lng: 4})
  t.deepEqual(toLatLng({lat: 0, lng: 0}), {lat: 0, lng: 0})

  t.deepEqual(toLatLng({latitude: 51, longitude: 4}), {lat: 51, lng: 4})
  t.deepEqual(toLatLng({latitude: 0, longitude: 0}), {lat: 0, lng: 0})

  t.throws(() => { toLatLng({foo: 'bar'}) }, /Unknown location format/)
})

test ('toLonLatTuple', t => {
  t.deepEqual(toLonLatTuple([4, 51]), [4, 51])
  t.deepEqual(toLonLatTuple([0, 0]), [0, 0])

  t.deepEqual(toLonLatTuple({lat: 51, lon: 4}), [4, 51])
  t.deepEqual(toLonLatTuple({lat: 0, lon: 0}), [0, 0])

  t.deepEqual(toLonLatTuple({lat: 51, lng: 4}), [4, 51])
  t.deepEqual(toLonLatTuple({lat: 0, lng: 0}), [0, 0])

  t.deepEqual(toLonLatTuple({latitude: 51, longitude: 4}), [4, 51])
  t.deepEqual(toLonLatTuple({latitude: 0, longitude: 0}), [0, 0])

  t.throws(() => { toLonLatTuple({foo: 'bar'}) }, /Unknown location format/)
})

test ('getLatitude', t => {
  t.deepEqual(getLatitude([4, 51]), 51)
  t.deepEqual(getLatitude({lat: 51, lon: 4}), 51)
  t.deepEqual(getLatitude({lat: 51, lng: 4}), 51)
  t.deepEqual(getLatitude({latitude: 51, longitude: 4}), 51)

  t.throws(() => { getLatitude({foo: 'bar'}) }, /Unknown location format/)
})

test ('getLongitude', t => {
  t.deepEqual(getLongitude([4, 51]), 4)
  t.deepEqual(getLongitude({lat: 51, lon: 4}), 4)
  t.deepEqual(getLongitude({lat: 51, lng: 4}), 4)
  t.deepEqual(getLongitude({latitude: 51, longitude: 4}), 4)

  t.throws(() => { getLatitude({foo: 'bar'}) }, /Unknown location format/)
})

test ('degToRad', t => {
  approxEqual(t, degToRad(45), Math.PI / 4)
  approxEqual(t, degToRad(90), Math.PI / 2)
  approxEqual(t, degToRad(0), 0)
  approxEqual(t, degToRad(-90), -Math.PI / 2)
})

test ('radToDeg', t => {
  approxEqual(t, radToDeg(Math.PI / 4), 45)
  approxEqual(t, radToDeg(Math.PI / 2), 90)
  approxEqual(t, radToDeg(0), 0)
  approxEqual(t, radToDeg(-Math.PI / 2), -90)
})

test ('knotsToMeterPerSecond', t => {
  approxEqual(t, knotsToMeterPerSecond(5), 2.57222)
  approxEqual(t, knotsToMeterPerSecond(-10), -5.14444)
})

test ('meterPerSecondToKnots', t => {
  approxEqual(t, meterPerSecondToKnots(5), 9.71922)
  approxEqual(t, meterPerSecondToKnots(-10), -19.4384)
})

test ('knotsToKmPerHour', t => {
  approxEqual(t, knotsToKmPerHour(1), 1.852)
  approxEqual(t, knotsToKmPerHour(-2), -3.704)
})

test ('kmPerHourToKnots', t => {
  approxEqual(t, kmPerHourToKnots(1.852), 1)
  approxEqual(t, kmPerHourToKnots(-3.704), -2)
})

test('angleAndDistanceTo', t => {
  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.001796630568236,lon:0}),
    {distance:199.99999999970845,angle:0})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat: 51.000635204829045,lon:0.0010093504645301253}),
    {distance:99.99965773348121,angle:44.999411688665425})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}),
    {distance:99.99999999843808,angle:89.99944533657323})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:50.99910168471588,lon:0}),
    {distance:99.99999999985421,angle:180})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:-0.001427437116126087}),
    {distance:99.99999999843808,angle:-89.99944533657323}) // = 270 degrees
})

test('angleAndDistanceTo (different location formats)', t => {
  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0})

  approxDeepEqual(t, angleAndDistanceTo({lat: 51, lng: 0}, {lat:51.00089831528412,lng:0}),
    {distance:99.99999999985421,angle:0})

  approxDeepEqual(t, angleAndDistanceTo({latitude: 51, longitude: 0}, {latitude:51.00089831528412,longitude:0}),
    {distance:99.99999999985421,angle:0})

  approxDeepEqual(t, angleAndDistanceTo([0, 51], [0, 51.00089831528412]),
    {distance:99.99999999985421,angle:0})

  t.throws(() => { angleAndDistanceTo({foo: 'bar'}) }, /Unknown location format/)
})

test('angleTo', t => {
  approxDeepEqual(t, angleTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 89.99944533657323)
})

test('distanceTo', t => {
  approxDeepEqual(t, distanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 99.99999999843808)
})

test('moveTo', t => {
  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 100, angle: 0}),
    {lat:51.00089831528412,lon:0})

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 200, angle: 0}),
    {lat:51.001796630568236,lon:0})

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 100, angle: 45}),
    {lat: 51.000635204829045,lon:0.0010093504645301253})

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 100, angle: 90}),
    {lat:51,lon:0.001427437116126087})

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 100, angle: 180}),
    {lat:50.99910168471588,lon:1.7481062952479413e-19})

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, {distance: 100, angle: 270}),
    {lat:51,lon:-0.001427437116126087})
})

test('moveTo (different location formats)', t => {
  const angleDistance = {distance: 100, angle: 45}

  approxDeepEqual(t, moveTo({lat: 51, lon: 0}, angleDistance),
    {lat: 51.000635204829045,lon:0.0010093504645301253})
  approxDeepEqual(t, moveTo({lat: 51, lng: 0}, angleDistance),
    {lat: 51.000635204829045,lng:0.0010093504645301253})
  approxDeepEqual(t, moveTo({latitude: 51, longitude: 0}, angleDistance),
    {latitude: 51.000635204829045,longitude:0.0010093504645301253})
  approxDeepEqual(t, moveTo([0, 51], angleDistance), 
    [0.0010093504645301253, 51.000635204829045])

  t.throws(() => { moveTo({foo: 'bar'}, {angle: 0, distance: 0}) }, /Unknown location format/)
})

test ('normalizeAngle', t => {
  t.is(normalizeAngle(0), 0)
  t.is(normalizeAngle(360), 0)
  t.is(normalizeAngle(760), 40)
  t.is(normalizeAngle(45), 45)
  t.is(normalizeAngle(400), 40)
  t.is(normalizeAngle(-40), 320)
  t.is(normalizeAngle(-400), 320)
  t.is(normalizeAngle(-760), 320)
})

test ('normalizeLatitude', t => {
  approxEqual(t, normalizeLatitude(0), 0)
  approxEqual(t, normalizeLatitude(-90), -90)
  approxEqual(t, normalizeLatitude(90), 90)

  approxEqual(t, normalizeLatitude(91), 89)
  approxEqual(t, normalizeLatitude(180), 0)
  approxEqual(t, normalizeLatitude(190), -10)

  approxEqual(t, normalizeLatitude(-91), -89)
  approxEqual(t, normalizeLatitude(-180), 0)
  approxEqual(t, normalizeLatitude(-190), 10)
})

test ('normalizeLongitude', t => {
  approxEqual(t, normalizeLongitude(0), 0)
  approxEqual(t, normalizeLongitude(-180), 180)
  approxEqual(t, normalizeLongitude(180), 180)

  approxEqual(t, normalizeLongitude(360), 0)
  approxEqual(t, normalizeLongitude(720), 0)
  approxEqual(t, normalizeLongitude(360 + 180), 180)

  approxEqual(t, normalizeLongitude(-360), 0)
  approxEqual(t, normalizeLongitude(-720), 0)
  approxEqual(t, normalizeLongitude(-360 - 180), 180)
})

test ('normalizeLocation', t => {
  approxDeepEqual(t, normalizeLocation([360, 91]), [0, 89])
  approxDeepEqual(t, normalizeLocation({lat: 91, lon: 360}), {lat: 89, lon: 0})
  approxDeepEqual(t, normalizeLocation({lat: 91, lng: 360}), {lat: 89, lng: 0})
  approxDeepEqual(t, normalizeLocation({latitude: 91, longitude: 360}), {latitude: 89, longitude: 0})
})

/**
 * Helper function to check whether two numbers are approximately equal
 * asserts when that's not the case
 * @param {Ava} t 
 * @param {number} value 
 * @param {number} expected 
 */
function approxEqual (t, value, expected) {
  t.is(round(value), round(expected))
}

/**
 * Helper function to check whether two objects or arrays are approximately deep equal
 * asserts when that's not the case
 * @param {Ava} t 
 * @param {number} value 
 * @param {number} expected 
 */
function approxDeepEqual (t, value, expected) {
  t.is(JSON.stringify(value, replacer), JSON.stringify(expected, replacer))
}

function replacer (key, value) {
  if (typeof value === 'number') {
    return round(value)
  }

  return value
}

function round (value) {
    return Math.round(value / EPSILON) * EPSILON
}

const EPSILON = 1e-3
