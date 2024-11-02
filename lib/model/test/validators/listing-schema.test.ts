import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { erc1155ItemIndex } from '@echo/model/helpers/item/erc1155-item-index'
import { erc721ItemIndex } from '@echo/model/helpers/item/erc721-item-index'
import { userIndex } from '@echo/model/helpers/user/user-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Erc721Item } from '@echo/model/types/item'
import { listingSchema, listingSignatureSchema } from '@echo/model/validators/listing-schema'
import { describe, expect, test } from '@jest/globals'
import { assoc, assocPath, dissoc, map, pipe, prop, reverse } from 'ramda'
import { ZodError } from 'zod'

describe('listingSchema', () => {
  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => listingSchema.parse(data)).toThrow()
    try {
      listingSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('fails if creator is missing', () => {
    expectZodError(dissoc('creator', listingMock), ['creator'])
  })

  test('fails if expiresAt is missing or invalid', () => {
    const prop = 'expiresAt'
    const path = [prop]
    expectZodError(dissoc(prop, listingMock), path)
    expectZodError(assoc(prop, undefined, listingMock), path)
    expectZodError(assoc(prop, -1, listingMock), path)
    expectZodError(assoc(prop, '', listingMock), path)
    expectZodError(assoc(prop, 'string', listingMock), path)
    expectZodError(assoc(prop, {}, listingMock), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, ['string'], listingMock), path)
  })

  test('fails if items is missing or invalid', () => {
    const prop = 'items'
    const path = [prop]
    expectZodError(dissoc(prop, listingMock), path)
    expectZodError(assoc(prop, undefined, listingMock), path)
    expectZodError(assoc(prop, erc721ItemMock, listingMock), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, [erc20ItemMock], listingMock), [prop, 0])
  })

  test('fails if locked is missing or invalid', () => {
    const prop = 'locked'
    const path = [prop]
    expectZodError(dissoc(prop, listingMock), path)
    expectZodError(assoc(prop, undefined, listingMock), path)
    expectZodError(assoc(prop, -1, listingMock), path)
    expectZodError(assoc(prop, '', listingMock), path)
    expectZodError(assoc(prop, 'string', listingMock), path)
    expectZodError(assoc(prop, {}, listingMock), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, ['string'], listingMock), path)
  })

  test('fails if slug is missing', () => {
    expectZodError(dissoc('slug', listingMock), ['slug'])
  })

  test('fails if state is missing or invalid', () => {
    const prop = 'state'
    const path = [prop]
    expectZodError(dissoc(prop, listingMock), path)
    expectZodError(assoc(prop, undefined, listingMock), path)
    expectZodError(assoc(prop, -1, listingMock), path)
    expectZodError(assoc(prop, '', listingMock), path)
    expectZodError(assoc(prop, 'string', listingMock), path)
    expectZodError(assoc(prop, {}, listingMock), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, ['string'], listingMock), path)
  })

  test('fails if target is missing or invalid', () => {
    const prop = 'target'
    const path = [prop]
    expectZodError(dissoc(prop, listingMock), path)
    expectZodError(assoc(prop, undefined, listingMock), path)
    expectZodError(assoc(prop, -1, listingMock), path)
    expectZodError(assoc(prop, '', listingMock), path)
    expectZodError(assoc(prop, 'string', listingMock), path)
    expectZodError(assoc(prop, [], listingMock), path)
    expectZodError(assoc(prop, ['string'], listingMock), path)
    expectZodError(assoc(prop, { quantity: 1 }, listingMock), [prop, 'collection'])
    expectZodError(assoc(prop, { collection: collectionMockPx }, listingMock), [prop, 'quantity'])
    expectZodError(assoc(prop, { collection: collectionMockPx, quantity: -1 }, listingMock), [prop, 'quantity'])
    expectZodError(assoc(prop, { collection: collectionMockPx, quantity: '' }, listingMock), [prop, 'quantity'])
    expectZodError(assoc(prop, { collection: collectionMockPx, quantity: undefined }, listingMock), [prop, 'quantity'])
    expectZodError(assoc(prop, { collection: collectionMockPx, quantity: [1] }, listingMock), [prop, 'quantity'])
    expectZodError(assoc(prop, { collection: collectionMockPx, quantity: {} }, listingMock), [prop, 'quantity'])
  })

  test('valid', () => {
    expect(listingSchema.parse(listingMock)).toStrictEqual(listingMock)
  })

  describe('listingSignatureSchema', () => {
    test('only keeps the indexes + sort ERC721 items index', () => {
      const expected = {
        creator: userIndex(listingMock.creator),
        items: [
          erc721ItemIndex(listingMock.items[0] as Erc721Item),
          erc721ItemIndex(listingMock.items[1] as Erc721Item)
        ],
        target: {
          collection: collectionIndex(listingMock.target.collection),
          quantity: listingMock.target.quantity
        }
      }
      expect(listingSignatureSchema.parse(assoc('items', reverse(listingMock.items), listingMock))).toStrictEqual(
        expected
      )
    })

    test('only keeps the indexes + sort ERC721/ERC1155 items index', () => {
      const erc721ItemMock2 = assocPath(['token', 'tokenId'], 100, erc721ItemMock)
      const erc1155ItemMock2 = assocPath(['token', 'tokenId'], 100, erc1155ItemMock)
      const listing = assoc('items', [erc1155ItemMock2, erc721ItemMock, erc721ItemMock2, erc1155ItemMock], listingMock)
      const expected = {
        creator: userIndex(listingMock.creator),
        items: [
          erc721ItemIndex(erc721ItemMock),
          erc721ItemIndex(erc721ItemMock2),
          erc1155ItemIndex(erc1155ItemMock),
          erc1155ItemIndex(erc1155ItemMock2)
        ],
        target: {
          collection: collectionIndex(listingMock.target.collection),
          quantity: listingMock.target.quantity
        }
      }
      expect(listingSignatureSchema.parse(listing)).toStrictEqual(expected)
    })
  })
})
