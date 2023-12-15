import { toPromise } from '@echo/utils/fp/to-promise'
import { describe, expect, it } from '@jest/globals'

describe('fp - toPromise', () => {
  it('basic number to promise test', async () => {
    await expect(toPromise(2)).resolves.toBe(2)
  })
})
