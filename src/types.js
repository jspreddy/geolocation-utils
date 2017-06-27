/**
 * Used data structures
 * 
 * Literature: http://www.movable-type.co.uk/scripts/latlong.html
 * 
 * @type {{lat: number, lon: number}} LatLon
 * 
 * @type {{lat: number, lon: number}} LatLng
 * 
 * @type {{latitude: number, longitude: number}} LatitudeLongitude
 * 
 * @type {[number, number]} LonLatTuple
 *     longitude first, latitude second
 * 
 * @type {LatLon | LatLng, LatitudeLongitude | LonLatTuple} Location
 * 
 * @type {{[topLeft: Location, bottomRight: Location]}} BoundingBox
 * 
 * @type {{heading: number, distance: number}} HeadingDistance
 *     heading in degrees
 *     distance in meters
 * 
 * @type {{location: Location, heading: number, speed: number}} LocationHeadingSpeed
 *     location containing longitude and latitude
 *     speed in meters per second
 *     heading in degrees
 * 
 * @type {{time: number, distance: number}} TimeDistance
 *     time in seconds
 *     distance in meters
 */