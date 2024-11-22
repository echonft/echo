import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createOfferSearchParamsSchema } from '@echo/routing/validators/frontend/offer/create-offer-search-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('offerSearchParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => createOfferSearchParamsSchema.parse(data)).toThrow()
    try {
      createOfferSearchParamsSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('fails if items are invalid', () => {
    expectZodError({ items: undefined }, ['items'])
    expectZodError({ items: [] }, ['items'])
    expectZodError({ items: [''] }, ['items', 0])
    expectZodError({ items: '' }, ['items'])
  })

  test('fails if target is invalid', () => {
    expectZodError({ items: [serializeNft(nftMockPx1)], target: [] }, ['target'])
    expectZodError({ items: [serializeNft(nftMockPx1)], target: '' }, ['target'])
    expectZodError({ items: [serializeNft(nftMockPx1)], target: {} }, ['target'])
  })

  test('valid without target', () => {
    const valid = { items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] }
    expect(createOfferSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })

  test('valid with target', () => {
    const valid = {
      items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)],
      target: serializeCollection(collectionMockPx)
    }
    expect(createOfferSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })
})
