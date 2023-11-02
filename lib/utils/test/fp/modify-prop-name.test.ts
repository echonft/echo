import { modifyPropName } from '@echo/utils/fp/modify-prop-name'
import { describe, expect, it } from '@jest/globals'

describe('', () => {
  it('modifies the prop if the prop is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyPropName('c', 'd', obj)).toStrictEqual({
      a: 1,
      b: 2,
      d: undefined
    })
  })

  it('modifies the prop name the prop is defined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    expect(modifyPropName('c', 'd', obj)).toStrictEqual({
      a: 1,
      b: 2,
      d: 3
    })
  })
})
