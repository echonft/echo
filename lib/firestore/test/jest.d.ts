// noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols

import '@jest/expect'
import '@jest/globals'

declare module '@jest/expect' {
  interface Matchers<R, T> {
    toBeUnixTimestampCloseTo(expected: number): R
    toEqualList(expected: T): R
    toBeMsSlug(): R
  }
}

export {}
