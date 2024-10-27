import { renameProp } from '@echo/utils/helpers/rename-prop'
import { describe, expect, it } from '@jest/globals'

describe('renameProp', () => {
  it('renames the prop', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(renameProp('b', 'c', obj)).toStrictEqual({ a: 1, c: 2 })
  })
})
