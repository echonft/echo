import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { describe, expect, it } from '@jest/globals'

describe('fp - eqPaths', () => {
  it('works on empty lists', () => {
    const listA: never[] = []
    const listB: never[] = []
    expect(eqListContent(listA, listB)).toBeTruthy()
  })
  it('returns true lists are identical', () => {
    const listA = [1, 2, 3]
    const listB = [1, 2, 3]
    expect(eqListContent(listA, listB)).toBeTruthy()
  })
  it('returns true lists have the same content, but in a different order', () => {
    const listA = ['a', 'b', 'c']
    const listB = ['b', 'a', 'c']
    expect(eqListContent(listA, listB)).toBeTruthy()
  })
  it('returns false if the content is not the same', () => {
    const listA = [1, 2, 3]
    let listB = [4, 1, 3]
    expect(eqListContent(listA, listB)).toBeFalsy()
    listB = [1, 2]
    expect(eqListContent(listA, listB)).toBeFalsy()
  })
})
