import { listHasDuplicates } from '@echo/utils/helpers/list-has-duplicates'
import { describe, expect, it } from '@jest/globals'
import { equals } from 'ramda'

describe('eqPaths', () => {
  it('returns false if all the elements are different', () => {
    expect(listHasDuplicates(equals, [1, 2, 3, 4])).toBeFalsy()
    expect(listHasDuplicates(equals, ['1', '2', 'a'])).toBeFalsy()
    expect(listHasDuplicates(equals, [{ a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }])).toBeFalsy()
    expect(listHasDuplicates(equals, ['1', '2', 'a', undefined])).toBeFalsy()
  })
  it('returns true if the list contains at least one duplicate', () => {
    expect(listHasDuplicates(equals, [1, 2, 1, 3, 4, 5])).toBeTruthy()
    expect(listHasDuplicates(equals, ['1', '1', '11', '11111', 'aaa', 'bbb'])).toBeTruthy()
    expect(listHasDuplicates(equals, [{ a: 1 }, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 1 }, { a: 1 }])).toBeTruthy()
  })
})
