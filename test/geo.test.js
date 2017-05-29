import test from 'ava'
import { 
  toLatitudeLongitude, toLatLon, toLatLng, toLonLatTuple,
  getLatitude, getLongitude,
  radToDeg, degToRad, 
  knotsToMeterPerSecond, meterPerSecondToKnots, knotsToKmPerHour, kmPerHourToKnots,
  angleAndDistanceTo, angleTo, distanceTo, moveTo,
  averageAngles, diffAngles 
} from '../src/geo'

// TODO: test getLocationType, and describe in API
// TODO: test createLocation, and describe in API

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
  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0})

  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.001796630568236,lon:0}),
    {distance:199.99999999970845,angle:0})

  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat: 51.000635204829045,lon:0.0010093504645301253}),
    {distance:99.99965773348121,angle:44.999411688665425})

  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}),
    {distance:99.99999999843808,angle:89.99944533657323})

  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:50.99910168471588,lon:0}),
    {distance:99.99999999985421,angle:180})

  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:-0.001427437116126087}),
    {distance:99.99999999843808,angle:-89.99944533657323}) // = 270 degrees
})

test('angleAndDistanceTo (different location formats)', t => {
  t.deepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0})
  t.deepEqual(angleAndDistanceTo({lat: 51, lng: 0}, {lat:51.00089831528412,lng:0}),
    {distance:99.99999999985421,angle:0})
  t.deepEqual(angleAndDistanceTo({latitude: 51, longitude: 0}, {latitude:51.00089831528412,longitude:0}),
    {distance:99.99999999985421,angle:0})
  t.deepEqual(angleAndDistanceTo([0, 51], [0, 51.00089831528412]),
    {distance:99.99999999985421,angle:0})

  t.throws(() => { angleAndDistanceTo({foo: 'bar'}) }, /Unknown location format/)
})

test('angleTo', t => {
  t.deepEqual(angleTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 89.99944533657323)
})

test('distanceTo', t => {
  t.deepEqual(distanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 99.99999999843808)
})

test('moveTo', t => {
  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 0}),
    {lat:51.00089831528412,lon:0})

  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 200, angle: 0}),
    {lat:51.001796630568236,lon:0})

  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 45}),
    {lat: 51.000635204829045,lon:0.0010093504645301253})

  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 90}),
    {lat:51,lon:0.001427437116126087})

  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 180}),
    {lat:50.99910168471588,lon:1.7481062952479413e-19})

  t.deepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 270}),
    {lat:51,lon:-0.001427437116126087})
})

test('moveTo (different location formats)', t => {
  const angleDistance = {distance: 100, angle: 45}

  t.deepEqual(moveTo({lat: 51, lon: 0}, angleDistance),
    {lat: 51.000635204829045,lon:0.0010093504645301253})
  t.deepEqual(moveTo({lat: 51, lng: 0}, angleDistance),
    {lat: 51.000635204829045,lng:0.0010093504645301253})
  t.deepEqual(moveTo({latitude: 51, longitude: 0}, angleDistance),
    {latitude: 51.000635204829045,longitude:0.0010093504645301253})
  t.deepEqual(moveTo([0, 51], angleDistance), 
    [0.0010093504645301253, 51.000635204829045])

  t.throws(() => { moveTo({foo: 'bar'}, {angle: 0, distance: 0}) }, /Unknown location format/)
})


// TODO: review all tests lower down

test('averageAngles', t => {
  t.is(averageAngles(90, 180), 135)
  t.is(averageAngles(180, 90), 135)
  t.is(averageAngles(90, 270), 180)
  t.is(averageAngles(-10, 10), 0)
  t.is(averageAngles(350, 10), 0)
  t.is(averageAngles(20, -40), 350)
  t.is(averageAngles(320, 20), 350)
})

test('diffAngles', t => {
  t.is(diffAngles(90, 180), 90)
  t.is(diffAngles(-20, 10), 30)
  t.is(diffAngles(90, 45), 45)
  t.is(diffAngles(270, 90), 180)
})

const EPSILON = 1e-4

/**
 * Helper function to check whether two numbers are approximately equal
 * asserts when that's not the case
 * @param {Ava} t 
 * @param {number} a 
 * @param {number} b 
 */
function approxEqual (t, a, b) {
    t.true(Math.abs(a - b) < EPSILON, `${a} approx equal ${b}`)
}