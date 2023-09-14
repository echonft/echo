import { stringIncludes } from '@echo/utils/fp/string-includes'
import { describe, expect, it } from '@jest/globals'

describe('fp - stringIncldes', () => {
  it('returns false if the value is not in the string', () => {
    expect(stringIncludes('d', 'abc')).toBeFalsy()
    expect(stringIncludes('d')('abc')).toBeFalsy()
    expect(stringIncludes('cd', 'abc')).toBeFalsy()
    expect(stringIncludes('abcd', 'abc')).toBeFalsy()
    expect(stringIncludes('a', '')).toBeFalsy()
  })
  it('returns true if the value is in the string', () => {
    expect(stringIncludes('a', 'abc')).toBeTruthy()
    expect(stringIncludes('ab', 'abc')).toBeTruthy()
    expect(stringIncludes('abc', 'abc')).toBeTruthy()
    expect(stringIncludes('', 'abc')).toBeTruthy()
  })
})
