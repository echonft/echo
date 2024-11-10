import { listingMock } from '@echo/model/mocks/listing-mock'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { selectionQueryParamsSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pick, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('selectionQueryParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => selectionQueryParamsSchema.parse(data)).toThrow()
    try {
      selectionQueryParamsSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('fails if listing is invalid', () => {
    expectZodError({ listing: undefined }, [])
    expectZodError({ listing: [] }, [])
    expectZodError({ listing: {} }, [])
  })

  test('fails if offer is invalid', () => {
    expectZodError({ offer: undefined }, [])
    expectZodError({ offer: [] }, [])
    expectZodError({ offer: {} }, [])
  })

  test('fails if swap is invalid', () => {
    expectZodError({ swap: undefined }, [])
    expectZodError({ swap: [] }, [])
    expectZodError({ swap: {} }, [])
  })

  test('fails if more than one selection are specified', () => {
    expectZodError({ listing: listingMock, offer: offerMockToJohnnycage, swap: swapMock }, [])
    expectZodError({ listing: listingMock, offer: offerMockToJohnnycage }, [])
    expectZodError({ listing: listingMock, swap: swapMock }, [])
    expectZodError({ offer: offerMockToJohnnycage, swap: swapMock }, [])
  })

  test('valid listing', () => {
    expect(selectionQueryParamsSchema.parse({ listing: listingMock })).toStrictEqual({
      listing: pick(['slug'], listingMock)
    })
  })

  test('valid offer', () => {
    expect(selectionQueryParamsSchema.parse({ offer: offerMockToJohnnycage })).toStrictEqual({
      offer: pick(['slug'], offerMockToJohnnycage)
    })
  })

  test('valid swap', () => {
    expect(selectionQueryParamsSchema.parse({ swap: swapMock })).toStrictEqual({
      swap: pick(['slug'], swapMock)
    })
  })
})
