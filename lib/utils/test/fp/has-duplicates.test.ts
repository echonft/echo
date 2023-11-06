import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { describe, expect, test } from '@jest/globals'

describe('fp - hasDuplicates', () => {
  test('returns true if the list contains duplicates', () => {
    expect(hasDuplicates(['1', '2', '3', '4', '1'])).toBeTruthy()
    expect(hasDuplicates([1, 2, undefined, 3, 1, 4, 5, 1])).toBeTruthy()
  })
  test('returns false if the list does not contain duplicates', () => {
    expect(hasDuplicates(['1', '2', '3', '4'])).toBeFalsy()
    expect(hasDuplicates([1, 2, undefined, 3, 4, 5, 6])).toBeFalsy()
  })
})
