/**
 * Function that always throws an error
 * @param {Error} error
 * @return
 */
export function throwError<T = unknown>(error: Error) {
  return (..._args: [unknown]): T => {
    throw error
  }
}
