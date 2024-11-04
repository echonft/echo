import { echoOfferMock } from '@echo/web3/mocks/echo-offer-mock'
import { echoOfferSchema } from '@echo/web3/validators/echo-offer-schema'
import { describe, expect, test } from '@jest/globals'

describe('echoOfferSchema', () => {
  test('maps correctly', () => {
    expect(echoOfferSchema.parse(echoOfferMock)).toStrictEqual(echoOfferMock)
  })
})
