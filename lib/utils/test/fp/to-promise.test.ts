import { toPromise } from '../../src/fp/to-promise'
import { describe, expect, it } from '@jest/globals'

describe('fp - toPromise', () => {
  it('basic number to promise test', () => {
    return expect(toPromise(2)).resolves.toBe(2)
  })
})
