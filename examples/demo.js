const geo = require('..')

console.log(geo.toLatLon([4, 51])) 
// { lat: 51, lon: 4 }

const point1 = {lat: 51, lon: 4}
const point2 = {lat: 51.001, lon: 4.001 }
console.log(geo.angleAndDistanceTo(point1, point2)) 
// { 
//   angle: 32.1...,      // degrees
//   distance: 131.5...   // meter
// }
