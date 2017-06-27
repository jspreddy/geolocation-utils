import test from 'ava'
import { approxEqual, approxDeepEqual } from './approx'
import { 
  isLatLon, isLatLng, isLatitudeLongitude, isLonLatTuple,
  getLocationType, createLocation,
  toLatitudeLongitude, toLatLon, toLatLng, toLonLatTuple,
  getLatitude, getLongitude,
  headingDistanceTo, headingTo, distanceTo, moveTo,
  average, getBoundingBox,
  insideBoundingBox, insideCircle, insidePolygon,
  normalizeHeading, normalizeLatitude, normalizeLongitude, normalizeLocation
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

test('headingDistanceTo', t => {
  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,heading:0}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:51.001796630568236,lon:0}),
    {distance:199.99999999970845,heading:0}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat: 51.000635204829045,lon:0.0010093504645301253}),
    {distance:99.99965773348121,heading:44.999411688665425}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}),
    {distance:99.99999999843808,heading:89.99944533657323}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:50.99910168471588,lon:0}),
    {distance:99.99999999985421,heading:180}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:51,lon:-0.001427437116126087}),
    {distance:99.99999999843808,heading:-89.99944533657323})) // = 270 degrees
})

test('headingDistanceTo (different location formats)', t => {
  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,heading:0}))

  t.truthy(approxDeepEqual(headingDistanceTo({lat: 51, lng: 0}, {lat:51.00089831528412,lng:0}),
    {distance:99.99999999985421,heading:0}))

  t.truthy(approxDeepEqual(headingDistanceTo({latitude: 51, longitude: 0}, {latitude:51.00089831528412,longitude:0}),
    {distance:99.99999999985421,heading:0}))

  t.truthy(approxDeepEqual(headingDistanceTo([0, 51], [0, 51.00089831528412]),
    {distance:99.99999999985421,heading:0}))

  t.throws(() => { headingDistanceTo({foo: 'bar'}) }, /Unknown location format/)
})

test('headingTo', t => {
  t.truthy(approxDeepEqual(headingTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 89.99944533657323))
})

test('distanceTo', t => {
  t.truthy(approxDeepEqual(distanceTo({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}), 99.99999999843808))
})

test('moveTo', t => {
  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, heading: 0}),
    {lat:51.00089831528412,lon:0}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 200, heading: 0}),
    {lat:51.001796630568236,lon:0}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, heading: 45}),
    {lat: 51.000635204829045,lon:0.0010093504645301253}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, heading: 90}),
    {lat:51,lon:0.001427437116126087}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, heading: 180}),
    {lat:50.99910168471588,lon:1.7481062952479413e-19}))

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, {distance: 100, heading: 270}),
    {lat:51,lon:-0.001427437116126087}))
})

test('moveTo (different location formats)', t => {
  const headingDistance = {distance: 100, heading: 45}

  t.truthy(approxDeepEqual(moveTo({lat: 51, lon: 0}, headingDistance),
    {lat: 51.000635204829045,lon:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo({lat: 51, lng: 0}, headingDistance),
    {lat: 51.000635204829045,lng:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo({latitude: 51, longitude: 0}, headingDistance),
    {latitude: 51.000635204829045,longitude:0.0010093504645301253}))
  t.truthy(approxDeepEqual(moveTo([0, 51], headingDistance), 
    [0.0010093504645301253, 51.000635204829045]))

  t.throws(() => { moveTo({foo: 'bar'}, {heading: 0, distance: 0}) }, /Unknown location format/)
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

test('insideBoundingBox', t => {
  const boundingBox = {
    topLeft:     {lat: 20, lon: 0}, 
    bottomRight: {lat: 0, lon: 10}
  }

  // inside 
  t.is(insideBoundingBox({lat: 15, lon: 5}, boundingBox), true)

  // on the edge
  t.is(insideBoundingBox({lat: 20, lon: 5}, boundingBox), true)
  t.is(insideBoundingBox({lat: 0, lon: 5}, boundingBox), true)
  t.is(insideBoundingBox({lat: 15, lon: 0}, boundingBox), true)
  t.is(insideBoundingBox({lat: 15, lon: 10}, boundingBox), true)

  // outside
  t.is(insideBoundingBox({lat: 21, lon: 5}, boundingBox), false)
  t.is(insideBoundingBox({lat: -1, lon: 5}, boundingBox), false)
  t.is(insideBoundingBox({lat: 15, lon: -1}, boundingBox), false)
  t.is(insideBoundingBox({lat: 15, lon: 11}, boundingBox), false)

  // wrong order of lat/lon
  t.is(insideBoundingBox({lat: 15, lon: 11}, 
      {topLeft: {lat: 0, lon: 0}, bottomRight: {lat: 20, lon: 10}}), false)
})

test('insideCircle', t => {
  const center = {lat: 51, lon: 4}
  const radius = 10000 // meters

  // inside 
  t.is(insideCircle({lat: 51.003, lon: 4.005}, center, radius), true) // 500 m, 45 degrees
  t.is(insideCircle({lat: 51.03, lon: 4.05}, center, radius), true) // 5000 m, 45 degrees
  t.is(insideCircle({lat: 50.991, lon: 4}, center, radius), true) // 1000 m, 180 degrees

  // outside
  t.is(insideCircle({lat: 51.0636, lon: 4.101}, center, radius), false) // 10000 m, 45 degrees
  t.is(insideCircle({lat: 51.3, lon: 4.5}, center, radius), false) // 50000 m, 45 degrees

  // negative radius
  t.is(insideCircle({lat: 51, lon: 4}, center, -1000), false)
})

test('insidePolygon', t => {
  // europa haven rotterdam, L shaped area
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

  // inside
  t.is(insidePolygon([4.033248424530029, 51.963294643601216], polygon), true)
  t.is(insidePolygon([4.043612480163573, 51.96090148972336], polygon), true)
  t.is(insidePolygon([4.051637649536133, 51.96144359654604], polygon), true)
  
  // outside
  t.is(insidePolygon([4.051766395568848, 51.96009492841525], polygon), false)
  t.is(insidePolygon([4.04545783996582, 51.961668370622995], polygon), false)
  t.is(insidePolygon([4.030179977416992, 51.96366484383961], polygon), false)

  // on the edge
  t.is(insidePolygon([4.03048038482666,  51.962779002459634], polygon), true)

  // other types of location
  t.is(insidePolygon({lon: 4.033248424530029, lat: 51.963294643601216}, polygon), true)

  // invalid input
  t.throws(() => {insidePolygon({foo: 2}, polygon)}, /Unknown location format/)
  t.throws(() => {insidePolygon([4.033248424530029, 51.963294643601216], [])}, /Invalid polygon. Non-empty Array expected/)
  t.throws(() => {insidePolygon([4.033248424530029, 51.963294643601216], {})}, /Invalid polygon. Array with locations expected/)
  t.throws(() => {insidePolygon([4.033248424530029, 51.963294643601216], null)}, /Invalid polygon. Array with locations expected/)
})

test ('normalizeHeading', t => {
  t.is(normalizeHeading(0), 0)
  t.is(normalizeHeading(360), 0)
  t.is(normalizeHeading(760), 40)
  t.is(normalizeHeading(45), 45)
  t.is(normalizeHeading(400), 40)
  t.is(normalizeHeading(-40), 320)
  t.is(normalizeHeading(-400), 320)
  t.is(normalizeHeading(-760), 320)
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
