import test from 'ava'

test ('approxEqual', t => {
  t.is(approxEqual(2, 2), true)
  t.is(approxEqual(2, 2.00001), true)
  t.is(approxEqual(2, 1.99999), true)
  t.is(approxEqual(2, 2.002), false)
  t.is(approxEqual(2, -2.002), false)
})

test ('approxDeepEqual', t => {
  t.is(approxDeepEqual([2, {a: 4}], [2, {a: 4}]), true)
  t.is(approxDeepEqual([2, {a: 4}], [2, {a: 4.00001}]), true)
  t.is(approxDeepEqual([2, {a: 4}], [2, {a: 4.1}]), false)
})

/**
 * Helper function to check whether two numbers are approximately equal
 * asserts when that's not the case
 * @param {number} value 
 * @param {number} expected 
 * @param {number} [digits] number of digits
 */
export function approxEqual (value, expected, digits) {
  return round(value, digits) === round(expected, digits)
}

/**
 * Helper function to check whether two objects or arrays are approximately deep equal
 * asserts when that's not the case
 * @param {number} value 
 * @param {number} expected 
 */
export function approxDeepEqual (value, expected, digits) {
  function replacer (key, value) {
    if (typeof value === 'number') {
      return round(value, digits)
    }

    return value
  }
  return JSON.stringify(value, replacer) === JSON.stringify(expected, replacer)
}

function round (value, digits = DIGITS) {
    return parseFloat(value.toFixed(digits))
}

const DIGITS = 4
