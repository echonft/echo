import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { createListingQueryParamsSchema } from '@echo/routing/validators/frontend/listing/create-listing-query-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('listingQueryParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => createListingQueryParamsSchema.parse(data)).toThrow()
    try {
      createListingQueryParamsSchema.parse(data)
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
    expectZodError({ items: nftMockPx1 }, [])
  })

  test('fails if target is invalid', () => {
    expectZodError({ target: undefined }, [])
    expectZodError({ target: 'slug' }, [])
    expectZodError({ target: {} }, [])
  })

  test('fails if both items and target are specified', () => {
    expectZodError({ items: [nftMockPx1], target: collectionMockPx }, [])
  })

  test('valid items', () => {
    expect(createListingQueryParamsSchema.parse({ items: [nftMockPx1, nftMockPx2] })).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)]
    })
  })

  test('valid target', () => {
    expect(createListingQueryParamsSchema.parse({ target: collectionMockPx })).toStrictEqual({
      target: collectionIndex(collectionMockPx)
    })
  })
})
