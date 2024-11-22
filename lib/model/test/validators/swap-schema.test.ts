import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { serializeSwap } from '@echo/model/serializers/serialize-swap'
import type { Erc20Item } from '@echo/model/types/item'
import { serializeSwapSchema, swapSchema } from '@echo/model/validators/swap-schema'
import { describe, expect, it, test } from '@jest/globals'
import { assoc, assocPath, dissoc, map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('swapSchema', () => {
  describe('swapSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => swapSchema.parse(data)).toThrow()
      try {
        swapSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    test('fails if sender is missing', () => {
      expectZodError(dissoc('sender', swapMock), ['sender'])
    })

    test('fails if sender items are missing or invalid', () => {
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(dissoc(prop, swapMock), path)
      expectZodError(assoc(prop, undefined, swapMock), path)
      expectZodError(assoc(prop, erc721ItemMock, swapMock), path)
      expectZodError(assoc(prop, [], swapMock), path)
    })

    test('fails if sender items contain duplicates', () => {
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(assoc(prop, [erc721ItemMock, erc1155ItemMock, erc20ItemMock, erc721ItemMock], swapMock), path)
      expectZodError(assoc(prop, [erc1155ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], swapMock), path)
      expectZodError(assoc(prop, [erc20ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], swapMock), path)
    })

    test('fails if sender items contain only erc20 items', () => {
      const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
      const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
      const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)
      const prop = 'senderItems'
      const path = [prop]
      expectZodError(assoc(prop, [erc20ItemMock, erc20Item2, erc20Item3, erc20Item4], swapMock), path)
    })

    test('fails if receiver is missing', () => {
      expectZodError(dissoc('receiver', swapMock), ['receiver'])
    })

    test('fails if receiver items are missing or invalid', () => {
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(dissoc(prop, swapMock), path)
      expectZodError(assoc(prop, undefined, swapMock), path)
      expectZodError(assoc(prop, erc721ItemMock, swapMock), path)
      expectZodError(assoc(prop, [], swapMock), path)
    })

    test('fails if receiver items contain duplicates', () => {
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(assoc(prop, [erc721ItemMock, erc1155ItemMock, erc20ItemMock, erc721ItemMock], swapMock), path)
      expectZodError(assoc(prop, [erc1155ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], swapMock), path)
      expectZodError(assoc(prop, [erc20ItemMock, erc1155ItemMock, erc721ItemMock, erc20ItemMock], swapMock), path)
    })

    test('fails if receiver items contain only erc20 items', () => {
      const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
      const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
      const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)
      const prop = 'receiverItems'
      const path = [prop]
      expectZodError(assoc(prop, [erc20ItemMock, erc20Item2, erc20Item3, erc20Item4], swapMock), path)
    })

    test('fails if slug is missing', () => {
      expectZodError(dissoc('slug', swapMock), ['slug'])
    })

    test('fails if transactionId is missing', () => {
      expectZodError(dissoc('transactionId', swapMock), ['transactionId'])
    })

    test('valid', () => {
      expect(swapSchema.parse(swapMock)).toStrictEqual(swapMock)
    })
  })

  describe('serializeSwapSchema', () => {
    it('transforms correctly', () => {
      expect(serializeSwapSchema.parse(swapMock)).toStrictEqual(serializeSwap(swapMock))
    })
  })
})
