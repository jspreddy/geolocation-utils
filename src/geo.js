export const EARTH_RADIUS = 6378137  // Earth's radius in meters

// Literature:
//
// http://www.movable-type.co.uk/scripts/latlong.html
//

/** * 
 * @type {{lat: number, lon: number}} LatLon
 * @type {{latitude: number, longitude: number}} LatitudeLongitude
 * @type {[number, number]} LonLatTuple
 * @type {LatLon | LatitudeLongitude | LonLatTuple} Location
 */

/**
 * Convert a location into an object with properties `lat` and `lon`
 * @param {Location} location
 * @returns {LatLon}
 */
export function toLatLon (location) {
  if (Array.isArray (location)) {
    return {
      lat: location[1],
      lon: location[0]
    }
  }
  
  if (location && 'lat' in location) {
    return {
      lat: location.lat,
      lon: location.lon
    }
  }
  
  if (location && 'latitude' in location) {
    return {
      lat: location.latitude,
      lon: location.longitude
    }
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Convert a location into an object with properties `latitude` and `longitude`
 * @param {Location} location
 * @returns {LatitudeLongitude}
 */
export function toLatitudeLongitude (location) {
  if (Array.isArray (location)) {
    return {
      latitude: location[1],
      longitude: location[0]
    }
  }
  
  if (location && 'lat' in location) {
    return {
      latitude: location.lat,
      longitude: location.lon
    }
  }
  
  if (location && 'latitude' in location) {
    return {
      latitude: location.latitude,
      longitude: location.longitude
    }
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard
 * 
 * Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!
 * 
 * @param {Location} location
 * @returns {LonLatTuple}
 */
export function toLonLatTuple (location) {
  if (Array.isArray (location)) {
    return [location[0], location[1]]
  }
  
  if (location && 'lat' in location) {
    return [location.lon, location.lat]
  }
  
  if (location && 'latitude' in location) {
    return [location.longitude, location.latitude]
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}


/**
 * Calculate the average of two or multiple points
 * @param {...{lon: number, lon: number}} points
 * @returns {{lon: number, lat: number}}
 */
// TODO: unit test averageOfPoints
export function averageOfPoints (...points) {
  const sum = {
    lon: 0,
    lat: 0
  }

  points.forEach(point => {
    sum.lon += point.lon
    sum.lat += point.lat
  })

  return {
    lon: sum.lon / points.length,
    lat: sum.lat / points.length
  }
}

/**
 * Calculate the average of two or multiple points in array
 * @param [{lon: number, lon: number}, ...] points
 * @returns {{lon: number, lat: number}}
 */
// TODO: unit test averageOfPoints
export function averageOfPointsArray (points) {
  const sum = {
    lon: 0,
    lat: 0
  }

  points.forEach(point => {
    sum.lon += point.lon
    sum.lat += point.lat
  })

  return {
    lon: sum.lon / points.length,
    lat: sum.lat / points.length
  }
}

/**
 * Calculate the position of a point located at a certain distance and angle
 * of given center point.
 *
 * This is a rough estimation.
 *
 * Source: http://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
 * @param {{lat: number, lon: number}} center
 * @param {number} distance  Distance in meters
 * @param {number} angle     Angle in degrees
 * @return {{lat: number, lon: number}}
 */
export function pointAroundCenter (center, distance, angle) {
  const dLat = distance * Math.cos(degToRad(angle)) / EARTH_RADIUS
  const dLon = distance * Math.sin(degToRad(angle)) / (EARTH_RADIUS * Math.cos(degToRad(center.lat)))

  return {
    lat: center.lat + radToDeg(dLat),
    lon: center.lon + radToDeg(dLon)
  }
}

/**
 * Calculate the angle and distance between two points
 *
 * Sources:
 * 
 *   http://www.movable-type.co.uk/scripts/latlong.html
 *   http://mathforum.org/library/drmath/view/55417.html
 * 
 * @param {{lat: number, lon: number}} center
 * @param {{lat: number, lon: number}} point
 * @return {{distance, angle}}  Distance in meters, angle in degrees
 */
export function angleDistance (center, point) {
  var lat1 = degToRad(center.lat)
  var lat2 = degToRad(point.lat)
  var dlat = degToRad(point.lat - center.lat)
  var dlon = degToRad(point.lon - center.lon)

  const a = Math.sin(dlat/2) * Math.sin(dlat/2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dlon/2) * Math.sin(dlon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = EARTH_RADIUS * c

  const y = Math.sin(dlon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon)
  const angle = radToDeg(Math.atan2(y, x))

  return { distance, angle }
}

/**
 * Test whether a point lies inside a given bounding box.
 * @param {{lat: number, lon: number}} point
 * @param {[{lon: number, lat: number}, {lon: number, lat: number}]} boundingBox
 *            A bounding box containing a top left and bottom right location.
 *            The order doesn't matter.
 * @return {boolean} Returns true when the point is inside the bounding box
 *                   or on the edge.
 */
export function pointInsideBoundingBox (point, boundingBox) {
  const lonMin = Math.min(boundingBox[0].lon, boundingBox[1].lon)
  const lonMax = Math.max(boundingBox[0].lon, boundingBox[1].lon)
  const latMin = Math.min(boundingBox[0].lat, boundingBox[1].lat)
  const latMax = Math.max(boundingBox[0].lat, boundingBox[1].lat)

  return point.lon >= lonMin && point.lon <= lonMax &&
      point.lat >= latMin && point.lat <= latMax
}

/**
 * Normalize an angle into the range [0, 360)
 * @param {number} angle   An angle in degrees
 * @return {number} Returns the normalized angle (degrees)
 */
export function normalizeAngle(angle) {
  let normalized = angle

  while (normalized < 0) {
    normalized += 360
  }

  while (normalized >= 360) {
    normalized -= 360
  }

  return normalized
}

/**
 * Calculate the smallest difference between two angles. Always smaller or equal
 * to 180 degrees.
 * @param {number} angle1   An angle in degrees
 * @param {number} angle2   An angle in degrees
 * @return {number} The difference between the angles in degrees
 */
export function diffAngles (angle1, angle2) {
  // normalize the angles and make sure they are ordered a1 smallest, a2 largest
  let a1 = normalizeAngle(angle1)
  let a2 = normalizeAngle(angle2)
  if (a1 > a2) {
    [a1, a2] = [a2, a1]  // swap
  }

  const diff = a2 - a1
  return diff > 180
      ? 360 - diff
      : diff
}

/**
 * Calculate the average of two angles. 
 * The function positions the average halfway the smallest of the two differences
 * in angles:
 *
 *   averageAngles(90, 180), 135)
 *   averageAngles(-10, 10), 0)
 *   averageAngles(20, -40), 350)
 * 
 * @param {number} angle1   An angle in degrees
 * @param {number} angle2   An angle in degrees
 * @return {number} The average of the angles in degrees
 */
export function averageAngles (angle1, angle2) {
  // normalize the angles and make sure they are ordered a1 smallest, a2 largest
  let a1 = normalizeAngle(angle1)
  let a2 = normalizeAngle(angle2)
  if (a1 > a2) {
    [a1, a2] = [a2, a1]  // swap
  }

  const diff = a2 - a1
  if (diff <= 180) {
    return (a2 + a1) / 2
  }
  else {
    // smallest angle is on the other side of the circle
    return normalizeAngle((a1 + a2 - 360) / 2)
  }
}

/**
 * Convert an angle in degrees into an angle in radians
 * @param {number} angle
 * @return {number}
 */
export function degToRad (angle) {
  return angle * Math.PI / 180
}

/**
 * Convert an angle in radians into an angle in degrees
 * @param {number} angle
 * @return {number}
 */
export function radToDeg (angle) {
  return angle * 180 / Math.PI
}
