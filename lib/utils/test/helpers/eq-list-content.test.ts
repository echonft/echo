import { eqList } from '@echo/utils/helpers/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('eqPaths', () => {
  it('works on empty lists', () => {
    const listA: never[] = []
    const listB: never[] = []
    expect(eqList(listA, listB)).toBeTruthy()
  })
  it('returns true lists are identical', () => {
    const listA = [1, 2, 3]
    const listB = [1, 2, 3]
    expect(eqList(listA, listB)).toBeTruthy()
  })
  it('returns true lists have the same content, but in a different order', () => {
    const listA = ['a', 'b', 'c']
    const listB = ['b', 'a', 'c']
    expect(eqList(listA, listB)).toBeTruthy()
  })
  it('returns false if the content is not the same', () => {
    const listA = [1, 2, 3]
    let listB = [4, 1, 3]
    expect(eqList(listA, listB)).toBeFalsy()
    listB = [1, 2]
    expect(eqList(listA, listB)).toBeFalsy()
  })
})
