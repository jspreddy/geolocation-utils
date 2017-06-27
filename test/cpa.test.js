import test from 'ava'
import { approxDeepEqual } from './approx'
import { cpa, cpaTime, cpaDistance } from '../src/cpa'

test('test1', t => {
  const track1 = {
    position: {x: 0, y: 0},
    vector: {x: 1, y: 1}
  }

  const track2 = {
    position: {x: 1, y: 0},
    vector: {x: -1, y: 1}
  }

  t.is(cpaTime(track1, track2), 0.5)
  t.is(cpaDistance(track1, track2), 0)
})

test('test2', t => {
  const track1 = {
    position: {x: 0, y: 0},
    vector: {x: 0, y: 1}
  }

  const track2 = {
    position: {x: 1, y: 1},
    vector: {x: -1, y: 0}
  }

  t.is(cpaTime(track1, track2), 1)
  t.is(cpaDistance(track1, track2), 0)
})

test('test3', t => {
  const track1 = {
    position: {x: 0, y: 0},
    vector: {x: 0, y: 1}
  }

  const track2 = {
    position: {x: 1, y: 1},
    vector: {x: -2, y: 0}
  }

  t.is(cpaTime(track1, track2), 0.6)
  t.is(cpaDistance(track1, track2), 0.4472135954999579)
})


test('test4', t => {
  const ship1 = {
    location: {lon: 4.61039, lat: 51.70401},
    speed: 5,     // meters/second
    heading: 200  // degrees
  }

  const ship2 = {
    location: {lon: 4.60109, lat: 51.69613},
    speed: 0.8334,  // meters/second
    heading: 180  // degrees
  }

  // the following outputs look realistic to me (I based it on two ships I saw on screen)
  const actual = cpa(ship1, ship2)
  const expected = {
    time: 251.22255125913932,     // seconds
    distance: 231.90976012822378  // meters
  }

  t.truthy(approxDeepEqual(actual, expected))
})


test('test5', t => {
  const ship1 = {
    location: {lon: 4.61935, lat: 51.71854},
    speed: 2.7777778,  // m/s
    heading: 204.2  // degrees
  }

  const ship2 = {
    location: {lon: 4.6247, lat: 51.71587},
    speed: 5.833333,  // m/s
    heading: 254.4  // degrees
  }

  // the following outputs look realistic to me (I based it on two ships I saw on screen)
  const actual = cpa(ship1, ship2)
  const expected = {
    time: 92.37206214154632,    // seconds
    distance: 212.8459458277701 // meters
  }

  t.truthy(approxDeepEqual(actual, expected))
})
