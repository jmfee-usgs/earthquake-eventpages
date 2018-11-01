const twoPi = 2 * Math.PI;


/**
 * Make sure number is between 0 and 2pi.
 *
 * @param value {Number}
 *     angle in radians.
 * @return {Number}
 *     angle in radians, in the range [0, 2pi).
 */
export function zeroToTwoPi(value) {
  while (value < 0) {
    value += twoPi;
  }
  while (value >= twoPi) {
    value -= twoPi;
  }
  return value;
}
