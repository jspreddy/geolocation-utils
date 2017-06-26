import test from 'ava'
import { 
  isLatLon, isLatLng, isLatitudeLongitude, isLonLatTuple,
  getLocationType, createLocation,
  toLatitudeLongitude, toLatLon, toLatLng, toLonLatTuple,
  getLatitude, getLongitude,
  radToDeg, degToRad, 
  knotsToMeterPerSecond, meterPerSecondToKnots, knotsToKmPerHour, kmPerHourToKnots,
  angleAndDistanceTo, angleTo, distanceTo, moveTo,
  average, getBoundingBox,
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
  t.truthy(approxEqual(degToRad(45), Math.PI / 4))
  t.truthy(approxEqual(degToRad(90), Math.PI / 2))
  t.truthy(approxEqual(degToRad(0), 0))
  t.truthy(approxEqual(degToRad(-90), -Math.PI / 2))
})

test ('radToDeg', t => {
  t.truthy(approxEqual(radToDeg(Math.PI / 4), 45))
  t.truthy(approxEqual(radToDeg(Math.PI / 2), 90))
  t.truthy(approxEqual(radToDeg(0), 0))
  t.truthy(approxEqual(radToDeg(-Math.PI / 2), -90))
})

test ('knotsToMeterPerSecond', t => {
  t.truthy(approxEqual(knotsToMeterPerSecond(5), 2.57222))
  t.truthy(approxEqual(knotsToMeterPerSecond(-10), -5.14444))
})

test ('meterPerSecondToKnots', t => {
  t.truthy(approxEqual(meterPerSecondToKnots(5), 9.71922))
  t.truthy(approxEqual(meterPerSecondToKnots(-10), -19.43846))
})

test ('knotsToKmPerHour', t => {
  t.truthy(approxEqual(knotsToKmPerHour(1), 1.852))
  t.truthy(approxEqual(knotsToKmPerHour(-2), -3.704))
})

test ('kmPerHourToKnots', t => {
  t.truthy(approxEqual(kmPerHourToKnots(1.852), 1))
  t.truthy(approxEqual(kmPerHourToKnots(-3.704), -2))
})

test('angleAndDistanceTo', t => {
  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.001796630568236,lon:0}),
    {distance:199.99999999970845,angle:0}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat: 51.000635204829045,lon:0.0010093504645301253}),
    {distance:99.99965773348121,angle:44.999411688665425}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}),
    {distance:99.99999999843808,angle:89.99944533657323}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:50.99910168471588,lon:0}),
    {distance:99.99999999985421,angle:180}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51,lon:-0.001427437116126087}),
    {distance:99.99999999843808,angle:-89.99944533657323})) // = 270 degrees
})

test('angleAndDistanceTo (different location formats)', t => {
  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({lat: 51, lng: 0}, {lat:51.00089831528412,lng:0}),
    {distance:99.99999999985421,angle:0}))

  t.truthy(approxDeepEqual(angleAndDistanceTo({latitude: 51, longitude: 0}, {latitude:51.00089831528412,longitude:0}),
    {distance:99.99999999985421,angle:0}))

  t.truthy(approxDeepEqual(angleAndDistanceTo([0, 51], [0, 51.00089831528412]),
    {distance:99.99999999985421,angle:0}))

  t.throws(() => { angleAndDistanceTo({foo: 'bar'}) }, /Unknown location format/)
})

test('angleTo', t => {
  t.truthy(approxDeepEqual(angleTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 89.99944533657323))
})

test('distanceTo', t => {
  t.truthy(approxDeepEqual(distanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 99.99999999843808))
})

test('moveTo', t => {
  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 0}),
    {lat:51.00089831528412,lon:0}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 200, angle: 0}),
    {lat:51.001796630568236,lon:0}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 45}),
    {lat: 51.000635204829045,lon:0.0010093504645301253}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 90}),
    {lat:51,lon:0.001427437116126087}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 180}),
    {lat:50.99910168471588,lon:1.7481062952479413e-19}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, angle: 270}),
    {lat:51,lon:-0.001427437116126087}))
})

test('moveTo (different location formats)', t => {
  const angleDistance = {distance: 100, angle: 45}

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, angleDistance),
    {lat: 51.000635204829045,lon:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo({lat: 51, lng: 0}, angleDistance),
    {lat: 51.000635204829045,lng:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo({latitude: 51, longitude: 0}, angleDistance),
    {latitude: 51.000635204829045,longitude:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo([0, 51], angleDistance), 
    [0.0010093504645301253, 51.000635204829045]))

  t.throws(() => { moveTo({foo: 'bar'}, {angle: 0, distance: 0}) }, /Unknown location format/)
})

test('average', t => {
  t.deepEqual(average([{lat: 30, lon: 10}, {lat: 50, lon: 30}]), {lat: 40, lon: 20})
  t.deepEqual(average([{lat: 30, lng: 10}, {lat: 50, lng: 30}]), {lat: 40, lng: 20})
  t.deepEqual(average([{latitude: 30, longitude: 10}, {latitude: 50, longitude: 30}]), {latitude: 40, longitude: 20})
  t.deepEqual(average([[10, 30], [30, 50]]), [20, 40])

  // mixed content
  t.deepEqual(average([{latitude: 30, longitude: 10}, {lat: 50, lon: 30}]), {latitude: 40, longitude: 20})

  // invalid input
  t.deepEqual(average([]), null)
  t.deepEqual(average(), null)
  t.throws(() => { average([{foo: 'bar'}]) }, /Unknown location format/)
})

test('getBoundingBox', t => {
  t.deepEqual(getBoundingBox([{lat: 30, lon: 10}, {lat: 50, lon: 40}]), 
      {topLeft: {lat: 50, lon: 10}, bottomRight: {lat: 30, lon: 40}})

  t.deepEqual(getBoundingBox([{lat: 30, lng: 10}, {lat: 50, lng: 40}]), 
      {topLeft: {lat: 50, lng: 10}, bottomRight: {lat: 30, lng: 40}})

  t.deepEqual(getBoundingBox([{latitude: 30, longitude: 10}, {latitude: 50, longitude: 40}]), 
      {topLeft: {latitude: 50, longitude: 10}, bottomRight: {latitude: 30, longitude: 40}})

  t.deepEqual(getBoundingBox([[10, 30], [40, 50]]), {topLeft:[10, 50], bottomRight: [40, 30]})

  // mixed content
  t.deepEqual(getBoundingBox([{latitude: 30, longitude: 10}, {lat: 50, lon: 40}]), 
      {topLeft: {latitude: 50, longitude: 10}, bottomRight: {latitude: 30, longitude: 40}})

  // invalid input
  t.deepEqual(getBoundingBox([]), {topLeft: null, bottomRight: null})
  t.deepEqual(getBoundingBox(), {topLeft: null, bottomRight: null})
  t.throws(() => { getBoundingBox([{foo: 'bar'}]) }, /Unknown location format/)
})

test('getBoundingBox with margin', t => {
  // without margin
  t.deepEqual(getBoundingBox([{lat: 51, lon: 4}]), 
      {topLeft: {lat: 51, lon: 4}, bottomRight: {lat: 51, lon: 4}})

  // with margin
  const margin = 10000 // meters
  const boundingBox = getBoundingBox([{lat: 51, lon: 4}], margin)
  t.truthy(approxDeepEqual(boundingBox.topLeft, {lat: 51.0898, lon: 3.857256})) 
  t.truthy(approxDeepEqual(boundingBox.bottomRight, {lat: 50.910168, lon: 4.142743}))

  // calcualate the distance between the corner points
  // distance of the diagonal should be equal to sqrt((2*margin)^2 + (2*margin)^2)
  const distance = distanceTo(boundingBox.topLeft, boundingBox.bottomRight)
  const digits = 0
  t.truthy(approxEqual(distance, Math.SQRT2 * 2 * margin, digits))
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
  t.truthy(approxEqual(normalizeLatitude(0), 0))
  t.truthy(approxEqual(normalizeLatitude(-90), -90))
  t.truthy(approxEqual(normalizeLatitude(90), 90))

  t.truthy(approxEqual(normalizeLatitude(91), 89))
  t.truthy(approxEqual(normalizeLatitude(180), 0))
  t.truthy(approxEqual(normalizeLatitude(190), -10))

  t.truthy(approxEqual(normalizeLatitude(-91), -89))
  t.truthy(approxEqual(normalizeLatitude(-180), 0))
  t.truthy(approxEqual(normalizeLatitude(-190), 10))
})

test ('normalizeLongitude', t => {
  t.truthy(approxEqual(normalizeLongitude(0), 0))
  t.truthy(approxEqual(normalizeLongitude(-180), 180))
  t.truthy(approxEqual(normalizeLongitude(180), 180))

  t.truthy(approxEqual(normalizeLongitude(360), 0))
  t.truthy(approxEqual(normalizeLongitude(720), 0))
  t.truthy(approxEqual(normalizeLongitude(360 + 180), 180))

  t.truthy(approxEqual(normalizeLongitude(-360), 0))
  t.truthy(approxEqual(normalizeLongitude(-720), 0))
  t.truthy(approxEqual(normalizeLongitude(-360 - 180), 180))
})

test ('normalizeLocation', t => {
  t.truthy(approxDeepEqual(normalizeLocation([360, 91]), [0, 89]))
  t.truthy(approxDeepEqual(normalizeLocation({lat: 91, lon: 360}), {lat: 89, lon: 0}))
  t.truthy(approxDeepEqual(normalizeLocation({lat: 91, lng: 360}), {lat: 89, lng: 0}))
  t.truthy(approxDeepEqual(normalizeLocation({latitude: 91, longitude: 360}), {latitude: 89, longitude: 0}))
})

/**
 * Helper function to check whether two numbers are approximately equal
 * asserts when that's not the case
 * @param {number} value 
 * @param {number} expected 
 * @param {number} [digits] number of digits
 */
function approxEqual (value, expected, digits) {
  return round(value, digits) === round(expected, digits)
}

/**
 * Helper function to check whether two objects or arrays are approximately deep equal
 * asserts when that's not the case
 * @param {number} value 
 * @param {number} expected 
 */
function approxDeepEqual (value, expected) {
  return JSON.stringify(value, replacer) === JSON.stringify(expected, replacer)
}

function replacer (key, value) {
  if (typeof value === 'number') {
    return round(value)
  }

  return value
}

function round (value, digits = DIGITS) {
    return parseFloat(value.toFixed(digits))
}

const DIGITS = 4
