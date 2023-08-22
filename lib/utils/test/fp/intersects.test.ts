/* eslint-disable @typescript-eslint/ban-ts-comment */
import { intersects } from '../../src/fp/intersects'
import { describe, expect, it } from '@jest/globals'

describe('fp - intersects', () => {
  it('returns false if the first list is undefined', () => {
    // @ts-ignore
    expect(intersects(undefined)(['a', 'b'])).toBeFalsy()
  })
  it('returns false if the second list is undefined', () => {
    // @ts-ignore
    expect(intersects(['a', 'b'])(undefined)).toBeFalsy()
  })
  it('returns false if the lists dont intersect', () => {
    expect(intersects(['a', 'b'])(['c', 'd'])).toBeFalsy()
  })
  it('returns true if the lists intersect', () => {
    expect(intersects(['a', 'b'])(['c', 'd', 'b'])).toBeTruthy()
  })
})
