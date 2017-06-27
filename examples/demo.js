const geo = require('..')

console.log(geo.toLatLon([4, 51])) 
// { lat: 51, lon: 4 }

const location1 = {lat: 51, lon: 4}
const location2 = {lat: 51.001, lon: 4.001 }
console.log(geo.angleAndDistanceTo(location1, location2)) 
// { 
//   heading: 32.1...,    // degrees
//   distance: 131.5...   // meter
// }
