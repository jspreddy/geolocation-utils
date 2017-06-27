import { headingDistanceTo } from './geo'
import { degToRad, knotsToMeterPerSecond } from './convert'

const EPSILON = 1e-8

/**
 * Calculate the CPA (closest point of approach) for two tracks
 *
 *     !!!MINT THE UNITS (ALL SI) !!!
 *
 * - Position of the tracks is a longitude/latitude
 * - Speed is in meters per second
 * - Heading is an angle in degrees
 * - Returned time is in seconds
 * - Returned distance is in meters
 *
 * Note: this function calculates a cheap, linear approximation of CPA
 *
 * Source: http://geomalgorithms.com/a07-_distance.html
 *
 * @param {LocationHeadingSpeed} track1
 * @param {LocationHeadingSpeed} track2
 * @return {TimeDistance}  Returns an object with time (s) and distance (m)
 */
export function cpa (track1, track2) {
  const { distance, heading } = headingDistanceTo(track1.location, track2.location)
  const dx = distance * Math.sin(degToRad(heading))
  const dy = distance * Math.cos(degToRad(heading))

  const tr1 = {
    position: {
      x: 0,
      y: 0
    },
    vector: {
      x: track1.speed * Math.sin(degToRad(track1.heading)),
      y: track1.speed * Math.cos(degToRad(track1.heading))
    }
  }

  const tr2 = {
    position: {
      x: dx,
      y: dy
    },
    vector: {
      x: track2.speed * Math.sin(degToRad(track2.heading)),
      y: track2.speed * Math.cos(degToRad(track2.heading))
    }
  }

  return {
    time: cpaTime(tr1, tr2), // seconds
    distance: cpaDistance(tr1, tr2) // meters
  }
}

/**
 * Compute the time of CPA for two tracks
 * @param {{position: {x, y}, vector: {x, y}}} tr1
 * @param {{position: {x, y}, vector: {x, y}}} tr2
 * @return {number} The time at which the two tracks are closest in seconds
 * @private
 */
export function cpaTime (tr1, tr2) {
  const dv = subtract(tr1.vector, tr2.vector)

  const dv2 = dot(dv, dv)
  if (dv2 < EPSILON) {     // the  tracks are almost parallel
    return 0               // any time is ok. Use time 0.
  }

  const w0 = subtract(tr1.position, tr2.position)
  return -dot(w0, dv) / dv2 // time of CPA
}


/**
 * Compute the distance at CPA for two tracks
 * @param {{position: {x, y}, vector: {x, y}}} tr1
 * @param {{position: {x, y}, vector: {x, y}}} tr2
 * @return {number} The distance for which the two tracks are closest
 * @private
 */
export function cpaDistance (tr1, tr2) {
  const time = cpaTime(tr1, tr2)
  const p1 = add(tr1.position, times(time, tr1.vector))
  const p2 = add(tr2.position, times(time, tr2.vector))

  return distance(p1, p2); // distance at CPA
}

function dot (u, v) {
  return u.x * v.x + u.y * v.y
}

function add (u, v) {
  return {
    x: u.x + v.x,
    y: u.y + v.y
  }
}

function times (factor, v) {
  return {
    x: factor * v.x,
    y: factor * v.y
  }
}

function subtract (u, v) {
  return {
    x: u.x - v.x,
    y: u.y - v.y
  }
}

function distance (u, v) {
  return norm(subtract(u, v))
}

function norm (v) {
  return Math.sqrt(dot(v,v))
}