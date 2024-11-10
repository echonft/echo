import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { listingSearchParamsSchema } from '@echo/routing/validators/frontend/listing/listing-search-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('listingSearchParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => listingSearchParamsSchema.parse(data)).toThrow()
    try {
      listingSearchParamsSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('fails if items are invalid', () => {
    expectZodError({ items: undefined }, [])
    expectZodError({ items: [] }, ['items'])
    expectZodError({ items: [''] }, ['items', 0])
    expectZodError({ items: '' }, [])
  })

  test('fails if target is invalid', () => {
    expectZodError({ target: undefined }, [])
    expectZodError({ target: {} }, [])
    expectZodError({ target: '' }, ['target'])
  })

  test('fails if both items and target are specified', () => {
    expectZodError({ items: [serializeNft(nftMockPx1)], target: collectionMockPx.slug }, [])
  })

  test('valid items', () => {
    const valid = { items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] }
    expect(listingSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })

  test('valid target', () => {
    const valid = { target: collectionMockPx.slug }
    expect(listingSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })
})
