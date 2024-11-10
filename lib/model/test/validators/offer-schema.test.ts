import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { baseOfferMockFromJohnnycage, offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import type { Erc20Item } from '@echo/model/types/item'
import {
  baseOfferSchema,
  offerSchema,
  serializedOfferSchema,
  serializeOfferSchema
} from '@echo/model/validators/offer-schema'
import { describe, expect, it, test } from '@jest/globals'
import { assoc, assocPath, dissoc, map, pick, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('offerSchema', () => {
  describe('baseOfferSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => baseOfferSchema.parse(data)).toThrow()
      try {
        baseOfferSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    test('fails if expiresAt is missing or invalid', () => {
      const prop = 'expiresAt'
      const path = [prop]
      expectZodError(dissoc(prop, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, undefined, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, -1, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, '', baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, 'string', baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, {}, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, [], baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, ['string'], baseOfferMockFromJohnnycage), path)
    })

    test('fails if sender is missing', () => {
      expectZodError(dissoc('sender', baseOfferMockFromJohnnycage), ['sender'])
    })

    test('fails if sender items are missing or invalid', () => {
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(dissoc(prop, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, undefined, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, erc721ItemMock, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, [], baseOfferMockFromJohnnycage), path)
    })

    test('fails if sender items contain duplicates', () => {
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(
        assoc(prop, [erc721ItemMock, erc1155ItemMock, erc20ItemMock, erc721ItemMock], baseOfferMockFromJohnnycage),
        path
      )
      expectZodError(
        assoc(prop, [erc1155ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], baseOfferMockFromJohnnycage),
        path
      )
      expectZodError(
        assoc(prop, [erc20ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], baseOfferMockFromJohnnycage),
        path
      )
    })

    test('fails if sender items contain only erc20 items', () => {
      const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
      const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
      const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(
        assoc(prop, [erc20ItemMock, erc20Item2, erc20Item3, erc20Item4], baseOfferMockFromJohnnycage),
        path
      )
    })

    test('fails if receiver is missing', () => {
      expectZodError(dissoc('receiver', baseOfferMockFromJohnnycage), ['receiver'])
    })

    test('fails if receiver items are missing or invalid', () => {
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(dissoc(prop, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, undefined, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, erc721ItemMock, baseOfferMockFromJohnnycage), path)
      expectZodError(assoc(prop, [], baseOfferMockFromJohnnycage), path)
    })

    test('fails if receiver items contain duplicates', () => {
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(
        assoc(prop, [erc721ItemMock, erc1155ItemMock, erc20ItemMock, erc721ItemMock], baseOfferMockFromJohnnycage),
        path
      )
      expectZodError(
        assoc(prop, [erc1155ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], baseOfferMockFromJohnnycage),
        path
      )
      expectZodError(
        assoc(prop, [erc20ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], baseOfferMockFromJohnnycage),
        path
      )
    })

    test('fails if receiver items contain only erc20 items', () => {
      const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
      const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
      const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(
        assoc(prop, [erc20ItemMock, erc20Item2, erc20Item3, erc20Item4], baseOfferMockFromJohnnycage),
        path
      )
    })

    test('valid', () => {
      expect(baseOfferSchema.parse(baseOfferMockFromJohnnycage)).toStrictEqual(baseOfferMockFromJohnnycage)
    })
  })

  describe('offerSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => offerSchema.parse(data)).toThrow()
      try {
        offerSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    test('fails if idContract is missing', () => {
      expectZodError(dissoc('idContract', offerMockToJohnnycage), ['idContract'])
    })

    test('fails if locked is missing or invalid', () => {
      const prop = 'locked'
      const path = [prop]
      expectZodError(dissoc(prop, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, undefined, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, -1, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, '', offerMockToJohnnycage), path)
      expectZodError(assoc(prop, 'string', offerMockToJohnnycage), path)
      expectZodError(assoc(prop, {}, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, [], offerMockToJohnnycage), path)
      expectZodError(assoc(prop, ['string'], offerMockToJohnnycage), path)
    })

    test('fails if slug is missing', () => {
      expectZodError(dissoc('slug', offerMockToJohnnycage), ['slug'])
    })

    test('fails if state is missing or invalid', () => {
      const prop = 'state'
      const path = [prop]
      expectZodError(dissoc(prop, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, undefined, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, -1, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, '', offerMockToJohnnycage), path)
      expectZodError(assoc(prop, 'string', offerMockToJohnnycage), path)
      expectZodError(assoc(prop, {}, offerMockToJohnnycage), path)
      expectZodError(assoc(prop, [], offerMockToJohnnycage), path)
      expectZodError(assoc(prop, ['string'], offerMockToJohnnycage), path)
    })

    test('valid', () => {
      expect(offerSchema.parse(offerMockToJohnnycage)).toStrictEqual(offerMockToJohnnycage)
    })
  })

  describe('serializeOfferSchema', () => {
    it('transform correctly', () => {
      expect(serializeOfferSchema.parse(offerMockToJohnnycage)).toStrictEqual(serializeOffer(offerMockToJohnnycage))
    })
  })

  describe('serializedOfferSchema', () => {
    it('transform correctly', () => {
      expect(serializedOfferSchema.parse(serializeOffer(offerMockToJohnnycage))).toStrictEqual(
        pick(['slug'], offerMockToJohnnycage)
      )
    })
  })
})
