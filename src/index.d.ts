declare module 'geolocation-utils' {
  interface LocationHeadingSpeed	{location: Location, speed: number, heading: number}
  interface LatLon	{lat: number, lon: number}
  interface LatLng	{lat: number, lng: number}
  interface LatitudeLongitude	{latitude: number, longitude: number}
  interface LonLatTuple	{lonLat: number[]}
  interface BoundingBox	{topLeft: Location, bottomRight: Location}
  interface HeadingDistance	{heading: number, distance: number}
  interface LocationHeadingSpeed	{location: Location, speed: number, heading: number}
  interface TimeDistance	{time: number, distance: number}

  type Location = LatLon | LatLng | LatitudeLongitude | LonLatTuple

  export function createLocation(latitude: number, longitude: number, type: string) : LatLon
  export function getLatitude(location: Location) : LatLng
  export function getLocationType(location: Location) : string
  export function getLongitude(location: Location) : LatLng
  export function isEqual(location1: Location, location2: Location, epsilon: number) : boolean
  export function isLatLon(object: Location) : boolean
  export function isLatLng(object: Location) : boolean
  export function isLatitudeLongitude(object: Location) : boolean
  export function isLonLatTuple(object: Location) : boolean
  export function toLatLng(location: Location) : LatLng
  export function toLatLon(location: Location) : LatLon
  export function toLatitudeLongitude(location: Location) : LatitudeLongitude
  export function toLonLatTuple(location: Location) : LonLatTuple

  export function average(locations: Location[]): Location | null
  export function headingDistanceTo (from: Location, to: Location) : HeadingDistance
  export function headingTo(from: Location, to: Location) : number
  export function distanceTo(from: Location, to: Location) : number
  export function getBoundingBox(locations: Location[], margin): BoundingBox
  export function insideBoundingBox(location: Location, boundingBox: BoundingBox): boolean
  export function insideCircle(location: Location, center: Location, radius: number) : boolean
  export function insidePolygon(location: Location, polygon: Location[]) : boolean
  export function moveTo(from: Location, headingDistance: HeadingDistance): LatLon

  export function normalizeHeading(heading: number) : number
  export function normalizeLatitude(latiude: number) : number
  export function normalizeLongitude(longitude: number) : number
  export function normalizeLocation(location: Location): LatLon

  export function degToRad(angle: number) : number
  export function radToDeg(angle: number) : number
  export function knotsToMeterPerSecond(knots: number) : number
  export function meterPerSecondToKnots(meterPerSecond: number) : number
  export function knotsToKmPerHour(knots: number) : number
  export function kmPerHourToKnots(kmPerHour: number) : number
}
