// noinspection ES6ConvertVarToLetConst

import '@jest/expect'
import '@jest/globals'

declare global {
  var clientEmail: string
  var projectId: string
  var privateKey: string
}

declare module '@jest/expect' {
  interface Matchers<R, T> {
    toBeMsSlug(): R
    toBeUnixTimestampCloseTo(expected: number): R
  }
}

export {}
