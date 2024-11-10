import { listingMock } from '@echo/model/mocks/listing-mock'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { selectionSearchParamsSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('selectionSearchParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => selectionSearchParamsSchema.parse(data)).toThrow()
    try {
      selectionSearchParamsSchema.parse(data)
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
    const valid = { listing: listingMock.slug }
    expect(selectionSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })

  test('valid offer', () => {
    const valid = { offer: offerMockToJohnnycage.slug }
    expect(selectionSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })

  test('valid swap', () => {
    const valid = { swap: swapMock.slug }
    expect(selectionSearchParamsSchema.parse(valid)).toStrictEqual(valid)
  })
})
