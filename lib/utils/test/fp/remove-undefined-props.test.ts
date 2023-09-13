import { removeUndefinedProps } from '@echo/utils/fp/remove-undefined-props'
import { describe, expect, it } from '@jest/globals'

describe('', () => {
  it('does not remove anything if there are no undefined props', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: {
        d: undefined
      }
    }
    expect(removeUndefinedProps(obj)).toStrictEqual(obj)
  })

  it('removes all undefined props no undefined props', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: undefined,
      d: {
        d: undefined
      },
      e: null
    }
    expect(removeUndefinedProps(obj)).toStrictEqual({
      a: 1,
      b: 'string',
      d: {
        d: undefined
      }
    })
  })
})
