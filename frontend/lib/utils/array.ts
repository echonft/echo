/**
 * Function to toggle a selection in an array. If the value is in the array, it removes it.
 * Else it will add the value in the array
 * @param array The array
 * @param value The value to toggle
 */
export function toggle<T>(array: Array<T>, value: T) {
  const newArray = array.filter((x) => x !== value)
  if (newArray.length === array.length) return array.concat(value)
  return newArray
}

/**
 * Add an element to an array if it's not already there
 * @param array The current array
 * @param value The value to add
 */
export function addIfNotThere<T>(array: Array<T>, value: T) {
  if (!array.some((current) => current === value)) {
    return array.concat(value)
  }
  return array
}
