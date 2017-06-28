const geo = require('..')

// convert various location formats
console.log(geo.toLatLon([4, 51]))                        // { lat: 51, lon: 4 }
console.log(geo.toLatitudeLongitude({ lat: 51, lng: 4 })) // { latitude: 51, longitude: 4 }

// calculate the distance between locations, move to a new location
const location1 = {lat: 51, lon: 4}
const location2 = {lat: 51.001, lon: 4.001 }
console.log(geo.headingDistanceTo(location1, location2)) 
// { 
//   heading: 32.1...,    // degrees
//   distance: 131.5...   // meters
// }
console.log(geo.moveTo(location1, {heading: 32.1, distance: 131.5}))
// {
//   lat: 51.001...,
//   lon: 4.001...,
// } 

// check whether a location is inside a circle, bounding box, or polygon
const polygon = [
  [4.03146, 51.9644],
  [4.03151, 51.9643],
  [4.03048, 51.9627],
  [4.04550, 51.9600],
  [4.05279, 51.9605],
  [4.05215, 51.9619],
  [4.04528, 51.9614],
  [4.03146, 51.9644]
]
console.log(geo.insidePolygon([4.03324, 51.9632], polygon)) // true

// and much more: 
// - calculate bounding boxes around a list of locations,
// - calculate the closest point of approach of two moving objects, 
// - etc...
