import { removeOrAddFromArray } from '@echo/utils/fp/remove-or-add-from-array'
import { describe, expect, it } from '@jest/globals'
import { eqProps } from 'ramda'

interface TestObject {
  id: string
  name: string
  value: number
}

describe('fp - removeOrAddFromArray', () => {
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
  it('remove the item if it is found', () => {
    const obj: TestObject = {
      id: 'idB',
      name: 'nameC',
      value: 4
    }
    let newArray = removeOrAddFromArray(list, obj, eqProps('id'))
    expect(newArray.length).toBe(2)
    expect(newArray[0]).toStrictEqual(objA)
    expect(newArray[1]).toStrictEqual(objC)
    newArray = removeOrAddFromArray(list, obj, eqProps('name'))
    expect(newArray.length).toBe(2)
    expect(newArray[0]).toStrictEqual(objA)
    expect(newArray[1]).toStrictEqual(objB)
  })

  it('add the item if it is not found', () => {
    const obj: TestObject = {
      id: 'idD',
      name: 'nameA',
      value: 4
    }
    const newArray = removeOrAddFromArray(list, obj, eqProps('id'))
    expect(newArray.length).toBe(4)
    expect(newArray[0]).toStrictEqual(objA)
    expect(newArray[1]).toStrictEqual(objB)
    expect(newArray[2]).toStrictEqual(objC)
    expect(newArray[3]).toStrictEqual(obj)
  })
})
