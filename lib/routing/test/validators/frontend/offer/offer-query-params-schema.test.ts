import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { offerQueryParamsSchema } from '@echo/routing/validators/frontend/offer/offer-query-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('offerQueryParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => offerQueryParamsSchema.parse(data)).toThrow()
    try {
      offerQueryParamsSchema.parse(data)
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
    expectZodError({ items: nftMockPx1 }, ['items'])
  })

  test('fails if target is invalid', () => {
    expectZodError({ items: [nftMockPx1], target: 'slug' }, ['target'])
    expectZodError({ items: [nftMockPx1], target: {} }, ['target', 'slug'])
  })

  test('valid without target', () => {
    expect(offerQueryParamsSchema.parse({ items: [nftMockPx1, nftMockPx2] })).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)]
    })
  })

  test('valid with target', () => {
    expect(offerQueryParamsSchema.parse({ items: [nftMockPx1, nftMockPx2], target: collectionMockPx })).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: collectionIndex(collectionMockPx)
    })
  })
})
