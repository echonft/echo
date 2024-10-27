import { toPromise } from '@echo/utils/helpers/to-promise'
import { describe, expect, it } from '@jest/globals'

describe('toPromise', () => {
  it('basic number to promise test', async () => {
    await expect(toPromise(2)).resolves.toBe(2)
  })
})
