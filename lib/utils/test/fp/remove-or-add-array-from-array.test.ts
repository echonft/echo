import { removeOrAddArrayFromArray } from '@echo/utils/fp/remove-or-add-array-from-array'
import { describe, expect, it } from '@jest/globals'
import { eqProps } from 'ramda'

interface TestObject {
  id: string
  name: string
  value: number
}
describe('fp -', () => {
  const objA: TestObject = {
    id: 'idA',
    name: 'nameA',
    value: 1
  }
  const objB: TestObject = {
    id: 'idB',
    name: 'nameB',
    value: 2
  }
  const objC: TestObject = {
    id: 'idC',
    name: 'nameC',
    value: 3
  }
  const list = [objA, objB, objC]

  it('items get added if not in the list', () => {
    const objD: TestObject = {
      id: 'idD',
      name: 'nameD',
      value: 3
    }
    const objE: TestObject = {
      id: 'idE',
      name: 'nameE',
      value: 3
    }
    const items = [objD, objE]
    const newArray = removeOrAddArrayFromArray(list, items, eqProps('id'))
    expect(newArray.length).toBe(5)
    expect(newArray[0]).toStrictEqual(objA)
    expect(newArray[1]).toStrictEqual(objB)
    expect(newArray[2]).toStrictEqual(objC)
    expect(newArray[3]).toStrictEqual(objD)
    expect(newArray[4]).toStrictEqual(objE)
  })

  it('items get remove if in the list', () => {
    const objD: TestObject = {
      id: 'idC',
      name: 'nameD',
      value: 3
    }
    const objE: TestObject = {
      id: 'idB',
      name: 'nameE',
      value: 3
    }
    const items = [objD, objE]
    const newArray = removeOrAddArrayFromArray(list, items, eqProps('id'))
    expect(newArray.length).toBe(1)
    expect(newArray[0]).toStrictEqual(objA)
  })

  it('items get removed if in the list and added if not', () => {
    const objD: TestObject = {
      id: 'idC',
      name: 'nameD',
      value: 3
    }
    const objE: TestObject = {
      id: 'idE',
      name: 'nameE',
      value: 3
    }
    const items = [objD, objE]
    const newArray = removeOrAddArrayFromArray(list, items, eqProps('id'))
    expect(newArray.length).toBe(3)
    expect(newArray[0]).toStrictEqual(objA)
    expect(newArray[1]).toStrictEqual(objB)
    expect(newArray[2]).toStrictEqual(objE)
  })
})
