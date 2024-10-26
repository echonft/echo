// noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols

import '@jest/expect'
import '@jest/globals'

declare global {
  var clientEmail: string
  var projectId: string
  var privateKey: string
}

declare module '@jest/expect' {
  interface Matchers<R, T> {
    toBeUnixTimestampCloseTo(expected: number): R
    toEqualList(expected: T): R
    toBeMsSlug(): R
  }
}

export {}
