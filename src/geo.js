export const EARTH_RADIUS = 6378137  // Earth's radius in meters

// Literature:
//
// http://www.movable-type.co.uk/scripts/latlong.html
//

/**
 * Used data structures
 * 
 * @type {{lat: number, lon: number}} LatLon
 * @type {{lat: number, lon: number}} LatLng
 * @type {{latitude: number, longitude: number}} LatitudeLongitude
 * @type {[number, number]} LonLatTuple
 * @type {LatLon | LatLng, LatitudeLongitude | LonLatTuple} Location
 * @type {{[topLeft: Location, bottomRight: Location]}} BoundingBox
 * @type {{distance: number, angle: number}} AngleDistance
 */

/**
 * Test whether an object is an object containing numeric properties `lat` and `lon`
 * @param {*} object Anything
 * @param {boolean} Returns true when object is of type LatLon
 */
export function isLatLon (object) {
  return (!!object && 
      typeof object.lat === 'number' && 
      typeof object.lon === 'number')
}

/**
 * Test whether an object is an object containing numeric properties `lat` and `lng`
 * @param {*} object Anything
 * @param {boolean} Returns true when object is of type LatLng
 */
export function isLatLng (object) {
  return (!!object && 
      typeof object.lat === 'number' && 
      typeof object.lng === 'number')
}

/**
 * Test whether an object is an object containing numeric properties `latitude` and `longitude`
 * @param {*} object Anything
 * @param {boolean} Returns true when object is of type LatitudeLongitude
 */
export function isLatitudeLongitude (object) {
  return (!!object && 
      typeof object.latitude === 'number' && 
      typeof object.longitude === 'number')
}

/**
 * Test whether an object is an array containing two numbers (longitude and latitude)
 * 
 * IMPORTANT: this function cannot see the difference between an array with lat/lon
 *            or an array with lon/lat numbers. It assumes an order lon/lat.
 * 
 * @param {*} object Anything
 * @param {boolean} Returns true when object is of type LonLatTuple
 */
export function isLonLatTuple (object) {
  return (Array.isArray (object) && 
      typeof object[0] === 'number' && 
      typeof object[1] === 'number')
}

/**
 * Get the type of a location object
 * @param {Location} location
 * @return {string} Returns the type of the location object
 *                  Recognized types: 'LonLatTuple', 'LatLon', 'LatLng', 'LatitudeLongitude'
 */
export function getLocationType (location) {
  if (isLonLatTuple(location)) {
    return 'LonLatTuple'
  }
  
  if (isLatLon(location)) {
    return 'LatLon'
  }
  
  if (isLatLng(location)) {
    return 'LatLng'
  }
  
  if (isLatitudeLongitude(location)) {
    return 'LatitudeLongitude'
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Create a location object of a specific type
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} type  Available types: 'LonLatTuple', 'LatLon', 'LatLng', 'LatitudeLongitude'
 */
export function createLocation (latitude, longitude, type) {
  if (type === 'LonLatTuple') {
    return [longitude, latitude]
  }
  
  if (type === 'LatLon') {
    return { lat: latitude, lon: longitude }
  }
  
  if (type === 'LatLng') {
    return { lat: latitude, lng: longitude }
  }
  
  if (type === 'LatitudeLongitude') {
    return { latitude, longitude }
  }
  
  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Convert a location into an object with properties `lat` and `lon`
 * @param {Location} location
 * @returns {LatLon}
 */
export function toLatLon (location) {
  if (isLonLatTuple(location)) {
    return {
      lat: location[1],
      lon: location[0]
    }
  }
  
  if (isLatLon(location)) {
    return {
      lat: location.lat,
      lon: location.lon
    }
  }
  
  if (isLatLng(location)) {
    return {
      lat: location.lat,
      lon: location.lng
    }
  }
  
  if (isLatitudeLongitude(location)) {
    return {
      lat: location.latitude,
      lon: location.longitude
    }
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Convert a location into an object with properties `lat` and `lng`
 * @param {Location} location
 * @returns {LatLng}
 */
export function toLatLng (location) {
  if (isLonLatTuple(location)) {
    return {
      lat: location[1],
      lng: location[0]
    }
  }
  
  if (isLatLon(location)) {
    return {
      lat: location.lat,
      lng: location.lon
    }
  }
  
  if (isLatLng(location)) {
    return {
      lat: location.lat,
      lng: location.lng
    }
  }
  
  if (isLatitudeLongitude(location)) {
    return {
      lat: location.latitude,
      lng: location.longitude
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
  if (isLonLatTuple(location)) {
    return {
      latitude: location[1],
      longitude: location[0]
    }
  }
  
  if (isLatLon(location)) {
    return {
      latitude: location.lat,
      longitude: location.lon
    }
  }
  
  if (isLatLng(location)) {
    return {
      latitude: location.lat,
      longitude: location.lng
    }
  }
  
  if (isLatitudeLongitude(location)) {
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
  if (isLonLatTuple(location)) {
    return [location[0], location[1]]
  }
  
  if (isLatLon(location)) {
    return [location.lon, location.lat]
  }
  
  if (isLatLng(location)) {
    return [location.lng, location.lat]
  }
  
  if (isLatitudeLongitude(location)) {
    return [location.longitude, location.latitude]
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Get the longitude of a location
 * @param {Location} location
 * @return {number} Returns the longitude
 */
export function getLongitude (location) {
  if (isLonLatTuple(location)) {
    return location[0]
  }
  
  if (isLatLon(location)) {
    return location.lon
  }
  
  if (isLatLng(location)) {
    return location.lng
  }
  
  if (isLatitudeLongitude(location)) {
    return location.longitude
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Get the latitude of a location object or array
 * @param {Location} location
 * @return {number} Returns the latitude
 */
export function getLatitude (location) {
  if (isLonLatTuple(location)) {
    return location[1]
  }
  
  if (isLatLon(location)) {
    return location.lat
  }
  
  if (isLatLng(location)) {
    return location.lat
  }
  
  if (isLatitudeLongitude(location)) {
    return location.latitude
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Move to a new location from a start location, angle, and distance
 *
 * This is a rough estimation.
 *
 * Source: 
 * 
 *   http://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
 * 
 * @param {Location} location             Start location
 * @param {AngleDistance} angleDistance   An object with property `angle` in degrees and `distance` in meters
 * @return {Location} Returns the moved location
 */
export function moveTo (location, angleDistance) {
  // TODO: improve precision of this function moveTo
  const lat = getLatitude(location)
  const lon = getLongitude(location)
  const { angle, distance } = angleDistance 

  const dLat = distance * Math.cos(degToRad(angle)) / EARTH_RADIUS
  const dLon = distance * Math.sin(degToRad(angle)) / (EARTH_RADIUS * Math.cos(degToRad(lat)))

  return createLocation(lat + radToDeg(dLat), lon + radToDeg(dLon), getLocationType(location))
}

/**
 * Calculate the angle and distance between two locations
 *
 * Sources:
 * 
 *   http://www.movable-type.co.uk/scripts/latlong.html
 *   http://mathforum.org/library/drmath/view/55417.html
 * 
 * @param {Location} from   Start location
 * @param {Location} to     End location
 * @return {{distance, angle}}  Returns an object with `distance` in meters and `angle` in degrees
 */
export function angleAndDistanceTo (from, to) {
  const fromLat = getLatitude(from)
  const fromLon = getLongitude(from)
  const toLat = getLatitude(to)
  const toLon = getLongitude(to)

  const lat1 = degToRad(fromLat)
  const lat2 = degToRad(toLat)
  const dlat = degToRad(toLat - fromLat)
  const dlon = degToRad(toLon - fromLon)

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
 * Calculate the angle from one location to another location
 * @param {Location} center 
 * @param {Location} point 
 * @return {number} Returns an angle in degrees
 */
export function angleTo (center, point) {
  return angleAndDistanceTo(center, point).angle
}

/**
 * Calculate the distance between two locations
 * @param {Location} center 
 * @param {Location} point 
 * @return {number} Returns the distance in meters
 */
export function distanceTo (center, point) {
  return angleAndDistanceTo(center, point).distance
}

/**
 * Test whether a location lies inside a given bounding box.
 * @param {Location} location
 * @param {BoundingBox} boundingBox
 *            A bounding box containing a top left and bottom right location.
 *            The order doesn't matter.
 * @return {boolean} Returns true when the point is inside the bounding box
 *                   or on the edge.
 */
export function insideBoundingBox (location, boundingBox) {
  const lat = getLatitude(location)
  const lon = getLongitude(location)

  const topLeftLon = getLongitude(boundingBox.topLeft)
  const topLeftLat = getLatitude(boundingBox.topLeft)
  const bottomRightLon = getLongitude(boundingBox.bottomRight)
  const bottomRightLat = getLatitude(boundingBox.bottomRight)
  
  const minLat = Math.min(topLeftLat, bottomRightLat)
  const maxLat = Math.max(topLeftLat, bottomRightLat)
  const minLon = Math.min(topLeftLon, bottomRightLon)
  const maxLon = Math.max(topLeftLon, bottomRightLon)

  return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat
}

/**
 * Normalize an angle into the range [0, 360)
 * @param {number} angle   An angle in degrees
 * @return {number} Returns the normalized angle (degrees)
 */
export function normalizeAngle(angle) {
  let normalized = angle % 360

  if (normalized < 0) {
    normalized += 360
  }

  if (normalized >= 360) {
    normalized -= 360
  }

  return normalized
}

/**
 * Normalize a latitude into the range [-90, 90] (upper and lower bound included)
 * 
 * See https://stackoverflow.com/questions/13368525/modulus-to-limit-latitude-and-longitude-values
 * 
 * @param {number} latitude 
 * @return {number} Returns the normalized latitude
 */
export function normalizeLatitude (latitude) {
  return Math.asin(Math.sin((latitude / 180) * Math.PI)) * (180 / Math.PI);
}
/**
 * Normalize a longitude into the range (-180, 180] (lower bound excluded, upper bound included)
 * 
 * @param {number} longitude 
 * @return {number} Returns the normalized longitude
 */
export function normalizeLongitude (longitude) {
  let normalized = longitude % 360

  if (normalized > 180) {
    normalized -= 360
  }

  if (normalized <= -180) {
    normalized += 360
  }

  return normalized
}

/**
 * Normalize the longitude and latitude of a location.
 * Latitude will be in the range [-90, 90] (upper and lower bound included)
 * Lontitude will be in the range (-180, 180] (lower bound excluded, upper bound included)
 * @param {Location} location 
 * @return {Location} Returns the normalized location
 */
export function normalizeLocation (location) {
  if (isLonLatTuple(location)) {
    return [normalizeLongitude(location[0]), normalizeLatitude(location[1])]
  }
  
  if (isLatLon(location)) {
    return {
      lat: normalizeLatitude(location.lat),
      lon: normalizeLongitude(location.lon)
    }
  }
  
  if (isLatLng(location)) {
    return {
      lat: normalizeLatitude(location.lat),
      lng: normalizeLongitude(location.lng)
    }
  }
  
  if (isLatitudeLongitude(location)) {
    return {
      latitude: normalizeLatitude(location.latitude),
      longitude: normalizeLongitude(location.longitude)
    }
  }

  throw new Error('Unknown location format ' + JSON.stringify(location))
}

/**
 * Calculate the average of a list with locations
 * @param {Location[]} locations 
 * @return {Location} Returns the average location or null when the list is empty
 *                    Location has the same structure as the first location from
 *                    the input array.
 */
export function average (locations) {
  if (!Array.isArray(locations) || locations.length === 0) {
    return null
  }

  const first = locations[0]
  const latitude = avg(locations.map(getLatitude))
  const longitude = avg(locations.map(getLongitude))

  return createLocation(latitude, longitude, getLocationType(first))
}

/**
 * Get the bounding box of a list with locations
 * @param {Locations[]} locations
 * @param {number} [margin]   Optional margin in meters. Zero by default.
 * @return {BoundingBox} Returns a bounding box described by it's top left 
 *                       and bottom right location
 */
export function getBoundingBox (locations, margin = 0) {
  if (!Array.isArray(locations) || locations.length === 0) {
    return {
      topLeft: null, 
      bottomRight: null
    }
  }

  const type = getLocationType(locations[0])
  const topLeftLat = Math.max(...locations.map(getLatitude))
  const topLeftLon = Math.min(...locations.map(getLongitude))
  const bottomRightLat = Math.min(...locations.map(getLatitude))
  const bottomRightLon = Math.max(...locations.map(getLongitude))

  const topLeft = createLocation(topLeftLat, topLeftLon, type)
  const bottomRight = createLocation(bottomRightLat, bottomRightLon, type)

  if (margin === null || margin === 0) {
    // no margin
    return { topLeft, bottomRight }
  }
  else {
    // add a margin in meters
    const distance = Math.SQRT2 * margin    
    return { 
      topLeft: moveTo(topLeft, {angle: 315, distance}), 
      bottomRight: moveTo(bottomRight, {angle: 135, distance})
    }
  }
}

/**
 * Calculate the average of a list with numbers
 * @param {number[]} values 
 * @return {number}
 */
function avg (values) {
  return sum(values) / values.length
}

/**
 * calculate the sum of a list with numbers
 * @param {number[]} values 
 * @return {number} Returns the sum
 */
function sum (values) {
  return values.reduce((a, b) => a + b, 0) 
}


/**
 * Convert an angle in degrees into an angle in radians
 * @param {number} angle   An angle in degrees
 * @return {number} Returns an angle in radians
 */
export function degToRad (angle) {
  return angle * Math.PI / 180
}

/**
 * Convert an angle in radians into an angle in degrees
 * @param {number} angle  An angle in radians
 * @return {number} Returns an angle in degrees
 */
export function radToDeg (angle) {
  return angle * 180 / Math.PI
}

/**
 * Convert a speed in knots into a speed in meter per second
 * 1 knot is 0.514444 m/s
 * @param {number} knots 
 * @return {number} Returns speed in m/s
 */
export function knotsToMeterPerSecond(knots) {
  return knots * 0.514444
}

/**
 * Convert a speed in meter per second into a speed in knots
 * 1 knot is 0.514444 m/s
 * @param {number} knots 
 * @return {number} Returns speed in m/s
 */
export function meterPerSecondToKnots(meterPerSecond) {
  return meterPerSecond / 0.514444
}

/**
 * Convert a speed in knots into a speed in kilometer per hour
 * 1 knot is 1.852 kilometer per hour
 * @param {number} knots   A speed in knots
 * @return {number} Returns speed in km/h
 */
export function knotsToKmPerHour (knots) {
  return knots * 1.852
}

/**
 * Convert a speed in kilometer per hour into a speed in knots
 * 1 knot is 1.852 kilometer per hour
 * @param {number} kmPerHour   A speed in km/h
 * @return {number} Returns speed in knots
 */
export function kmPerHourToKnots (kmPerHour) {
  return kmPerHour / 1.852
}
