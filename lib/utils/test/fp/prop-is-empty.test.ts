import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { describe, expect, it } from '@jest/globals'

describe('fp - propIsEmpty', () => {
  it('returns false if the prop does not exist', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(propIsEmpty('c', obj)).toBeFalsy()
  })
  it('returns true if the prop is empty', () => {
    const obj = {
      a: 1,
      b: 2,
      c: []
    }
    expect(propIsEmpty('c', obj)).toBeTruthy()
    const obj2 = {
      a: { 1: 1 },
      b: { 2: 1 },
      c: {}
    }
    expect(propIsEmpty('c', obj2)).toBeTruthy()
    const obj3 = {
      a: '1',
      b: '2',
      c: ''
    }
    expect(propIsEmpty('c', obj3)).toBeTruthy()
  })
  it('returns false if the prop exists and is not empty', () => {
    const obj = {
      a: 1,
      b: 2,
      c: [1, 2]
    }
    expect(propIsEmpty('c', obj)).toBeFalsy()
    const obj2 = {
      a: { 1: 1 },
      b: { 2: 1 },
      c: { 3: 3 }
    }
    expect(propIsEmpty('c', obj2)).toBeFalsy()
    const obj3 = {
      a: '1',
      b: '2',
      c: '3'
    }
    expect(propIsEmpty('c', obj3)).toBeFalsy()
  })
})
