import { listElementsEq } from '@echo/utils/helpers/list-elements-eq'
import { describe, expect, it } from '@jest/globals'

describe('eqPaths', () => {
  it('returns true if all the elements in a list are equal', () => {
    expect(listElementsEq([1, 1, 1])).toBeTruthy()
    expect(listElementsEq(['1', '1', '1'])).toBeTruthy()
    expect(listElementsEq([{ a: 1 }, { a: 1 }, { a: 1 }])).toBeTruthy()
  })
  it('returns false if not all the elements in a list are equal', () => {
    expect(listElementsEq([1, 2, 1])).toBeFalsy()
    expect(listElementsEq(['1', '1', '11'])).toBeFalsy()
    expect(listElementsEq([{ a: 1 }, { a: 1 }, { a: 1, b: 2 }])).toBeFalsy()
    expect(listElementsEq([{ a: 1 }, undefined, { a: 1 }])).toBeFalsy()
  })
})
