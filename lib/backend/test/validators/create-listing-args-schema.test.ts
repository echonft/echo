import { createListingArgsSchema } from '@echo/backend/validators/create-listing-args-schema'
import { Expiration } from '@echo/model/constants/expiration'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { describe, expect, it, test } from '@jest/globals'
import { assoc, dissoc, map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('createListingArgsSchema', () => {
  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => createListingArgsSchema.parse(data)).toThrow()
    try {
      createListingArgsSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }
  const validData = {
    items: listingMock.items,
    target: listingMock.target,
    expiration: Expiration.OneDay
  }

  test('fails if expiration is missing or invalid', () => {
    const prop = 'expiration'
    const path = [prop]
    expectZodError(dissoc(prop, validData), path)
    expectZodError(assoc(prop, undefined, validData), path)
    expectZodError(assoc(prop, -1, validData), path)
    expectZodError(assoc(prop, '', validData), path)
    expectZodError(assoc(prop, 'string', validData), path)
    expectZodError(assoc(prop, {}, validData), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, ['string'], validData), path)
  })

  it('valid', () => {
    expect(createListingArgsSchema.parse(validData)).toStrictEqual(validData)
  })
})
