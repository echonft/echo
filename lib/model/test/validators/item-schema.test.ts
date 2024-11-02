import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { erc1155TokenMock, erc20TokenMock, erc721TokenMock } from '@echo/model/mocks/token-mock'
import {
  erc1155ItemIndexSchema,
  erc1155ItemSchema,
  erc20ItemIndexSchema,
  erc20ItemSchema,
  erc721ItemIndexSchema,
  erc721ItemSchema,
  itemSchema
} from '@echo/model/validators/item-schema'
import { describe, expect, it } from '@jest/globals'
import { map, pick, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('itemSchema', () => {
  describe('itemSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => itemSchema.parse(data)).toThrow()
      try {
        itemSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('fails if token is missing', () => {
      expectZodError({}, ['token'])
    })

    it('valid', () => {
      expect(itemSchema.parse({ token: erc20TokenMock })).toStrictEqual({ token: erc20TokenMock })
      expect(itemSchema.parse({ token: erc721TokenMock })).toStrictEqual({ token: erc721TokenMock })
      expect(itemSchema.parse({ token: erc1155TokenMock })).toStrictEqual({ token: erc1155TokenMock })
    })
  })

  describe('erc20ItemSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc20ItemSchema.parse(data)).toThrow()
      try {
        erc20ItemSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('fails if token is missing', () => {
      expectZodError({}, ['token'])
    })

    it('fails if quantity is missing', () => {
      expectZodError({}, ['quantity'])
    })

    it('valid', () => {
      expect(erc20ItemSchema.parse(erc20ItemMock)).toStrictEqual(erc20ItemMock)
    })
  })

  describe('erc20ItemIndexSchema', () => {
    it('only keep the index', () => {
      expect(erc20ItemIndexSchema.parse(erc20ItemMock)).toStrictEqual({
        token: { contract: erc20ItemMock.token.contract, type: erc20ItemMock.token.type },
        quantity: erc20ItemMock.quantity
      })
    })
  })

  describe('erc721ItemSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc721ItemSchema.parse(data)).toThrow()
      try {
        erc721ItemSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('fails if token is missing', () => {
      expectZodError({}, ['token'])
    })

    it('valid', () => {
      expect(erc721ItemSchema.parse(erc721ItemMock)).toStrictEqual(erc721ItemMock)
    })
  })

  describe('erc721ItemIndexSchema', () => {
    it('only keep the index', () => {
      expect(erc721ItemIndexSchema.parse(erc721ItemMock)).toStrictEqual({
        token: {
          collection: pick(['slug'], erc721ItemMock.token.collection),
          tokenId: erc721ItemMock.token.tokenId,
          type: erc721ItemMock.token.type
        }
      })
    })
  })

  describe('erc1155ItemSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc1155ItemSchema.parse(data)).toThrow()
      try {
        erc1155ItemSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('fails if token is missing', () => {
      expectZodError({}, ['token'])
    })

    it('fails if quantity is missing', () => {
      expectZodError({}, ['quantity'])
    })

    it('valid', () => {
      expect(erc1155ItemSchema.parse(erc1155ItemMock)).toStrictEqual(erc1155ItemMock)
    })
  })

  describe('erc1155ItemIndexSchema', () => {
    it('only keep the index', () => {
      expect(erc1155ItemIndexSchema.parse(erc1155ItemMock)).toStrictEqual({
        token: {
          collection: pick(['slug'], erc1155ItemMock.token.collection),
          tokenId: erc1155ItemMock.token.tokenId,
          type: erc1155ItemMock.token.type
        },
        quantity: erc1155ItemMock.quantity
      })
    })
  })
})
