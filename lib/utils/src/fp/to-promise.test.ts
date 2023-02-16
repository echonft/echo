import { toPromise } from './to-promise'
import { describe, expect, it } from '@jest/globals'

describe('toPromise', () => {
  it('basic number to promise test', () => {
    return expect(toPromise(2)).resolves.toBe(2)
  })
})
