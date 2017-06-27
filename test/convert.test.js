import test from 'ava'
import { approxEqual, approxDeepEqual } from './approx'
import { 
  radToDeg, degToRad, 
  knotsToMeterPerSecond, meterPerSecondToKnots, knotsToKmPerHour, kmPerHourToKnots
} from '../src/convert'

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
