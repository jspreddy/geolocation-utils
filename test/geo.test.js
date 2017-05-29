import test from 'ava'
import { 
  toLatitudeLongitude, toLatLon, toLatLng, toLonLatTuple,
  pointAroundCenter, angleDistance, averageAngles, diffAngles 
} from '../src/geo'

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




// TODO: review all tests lower down

test('pointAroundCenter', t => {
  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 100, 0),
    {lat:51.00089831528412,lon:0})

  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 200, 0),
    {lat:51.001796630568236,lon:0})

  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 100, 45),
    {lat: 51.000635204829045,lon:0.0010093504645301253})

  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 100, 90),
    {lat:51,lon:0.001427437116126087})

  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 100, 180),
    {lat:50.99910168471588,lon:1.7481062952479413e-19})

  t.deepEqual(pointAroundCenter({lat: 51, lon: 0}, 100, 270),
    {lat:51,lon:-0.001427437116126087})
})

test('angleDistance', t => {
  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat:51.00089831528412,lon:0}),
    {distance:99.99999999985421,angle:0})

  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat:51.001796630568236,lon:0}),
    {distance:199.99999999970845,angle:0})

  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat: 51.000635204829045,lon:0.0010093504645301253}),
    {distance:99.99965773348121,angle:44.999411688665425})

  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat:51,lon:0.001427437116126087}),
    {distance:99.99999999843808,angle:89.99944533657323})

  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat:50.99910168471588,lon:0}),
    {distance:99.99999999985421,angle:180})

  t.deepEqual(angleDistance({lat: 51, lon: 0}, {lat:51,lon:-0.001427437116126087}),
    {distance:99.99999999843808,angle:-89.99944533657323}) // = 270 degrees

})

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