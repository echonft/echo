import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { erc1155NftMock, erc721NftMock } from '@echo/model/mocks/nft-mock'
import { erc20TokenMock, erc721TokenMock } from '@echo/model/mocks/token-mock'
import {
  erc1155TokenIndexSchema,
  erc1155TokenSchema,
  erc20TokenIndexSchema,
  erc20TokenSchema,
  erc721TokenIndexSchema,
  erc721TokenSchema,
  tokenBalanceSchema,
  tokenSchema
} from '@echo/model/validators/token-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, map, pick, pipe, prop, values } from 'ramda'
import { ZodError } from 'zod'

describe('tokenSchema', () => {
  describe('tokenSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => tokenSchema.parse(data)).toThrow()
      try {
        tokenSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }
    const validData = {
      contract: collectionMockPx.contract,
      name: 'name',
      type: TokenType.Erc1155
    }

    it('fails if name is missing or invalid', () => {
      const prop = 'name'
      const path = [prop]
      expectZodError(dissoc(prop, validData), path)
      expectZodError(assoc(prop, '', validData), path)
      expectZodError(assoc(prop, 1, validData), path)
      expectZodError(assoc(prop, undefined, validData), path)
      expectZodError(assoc(prop, [], validData), path)
      expectZodError(assoc(prop, {}, validData), path)
    })

    it('valid', () => {
      pipe(
        values,
        map((tokenType) => {
          const data = assoc('type', tokenType, validData)
          expect(tokenSchema.parse(data)).toStrictEqual(data)
        })
      )(TokenType)
    })
  })

  describe('erc20TokenSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc20TokenSchema.parse(data)).toThrow()
      try {
        erc20TokenSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }
    const validData = {
      contract: collectionMockPx.contract,
      decimals: 2,
      name: 'name',
      type: TokenType.Erc20
    }

    it('fails if decimals is missing or invalid', () => {
      const prop = 'decimals'
      const path = [prop]
      expectZodError(dissoc(prop, validData), path)
      expectZodError(assoc(prop, '', validData), path)
      expectZodError(assoc(prop, 1.5, validData), path)
      expectZodError(assoc(prop, undefined, validData), path)
      expectZodError(assoc(prop, [], validData), path)
      expectZodError(assoc(prop, {}, validData), path)
    })

    it('valid', () => {
      expect(erc20TokenSchema.parse(validData)).toStrictEqual(validData)
    })
  })

  describe('erc20TokenIndexSchema', () => {
    const validData = {
      contract: collectionMockPx.contract,
      decimals: 2,
      name: 'name',
      type: TokenType.Erc20
    }

    it('only keep the index', () => {
      expect(erc20TokenIndexSchema.parse(validData)).toStrictEqual(pick(['contract', 'type'], validData))
    })
  })

  describe('erc721TokenSchema', () => {
    const validData = {
      contract: collectionMockPx.contract,
      ...erc721NftMock
    }

    it('only keep Erc721Token props', () => {
      expect(erc721TokenSchema.parse(validData)).toStrictEqual({
        contract: validData.contract,
        collection: pick(['name', 'slug', 'totalSupply'], validData.collection),
        name: validData.name,
        owner: validData.owner,
        pictureUrl: validData.pictureUrl,
        tokenId: validData.tokenId,
        type: TokenType.Erc721
      })
    })
  })

  describe('erc721TokenIndexSchema', () => {
    it('only keep index props', () => {
      expect(erc721TokenIndexSchema.parse(erc721NftMock)).toStrictEqual({
        collection: pick(['slug'], erc721NftMock.collection),
        tokenId: erc721NftMock.tokenId,
        type: erc721NftMock.type
      })
    })
  })

  describe('erc1155TokenSchema', () => {
    const validData = {
      contract: collectionMockPx.contract,
      ...erc1155NftMock
    }

    it('only keep Erc1155Token props', () => {
      expect(erc1155TokenSchema.parse(validData)).toStrictEqual({
        contract: validData.contract,
        collection: pick(['name', 'slug', 'totalSupply'], validData.collection),
        name: validData.name,
        owner: validData.owner,
        pictureUrl: validData.pictureUrl,
        tokenId: validData.tokenId,
        type: TokenType.Erc1155
      })
    })
  })

  describe('erc1155TokenIndexSchema', () => {
    it('only keep index props', () => {
      expect(erc1155TokenIndexSchema.parse(erc1155NftMock)).toStrictEqual({
        collection: pick(['slug'], erc1155NftMock.collection),
        tokenId: erc1155NftMock.tokenId,
        type: erc1155NftMock.type
      })
    })
  })

  describe('tokenBalanceSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => tokenBalanceSchema.parse(data)).toThrow()
      try {
        tokenBalanceSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }
    const validData = {
      token: erc20TokenMock,
      balance: 2.25
    }

    it('fails if token is missing or invalid', () => {
      const prop = 'token'
      const path = [prop]
      expectZodError(dissoc(prop, validData), path)
      expectZodError(assoc(prop, erc721TokenMock, validData), path)
    })

    it('fails if balance is missing or invalid', () => {
      const prop = 'balance'
      const path = [prop]
      expectZodError(dissoc(prop, validData), path)
      expectZodError(assoc(prop, '', validData), path)
      expectZodError(assoc(prop, undefined, validData), path)
      expectZodError(assoc(prop, [], validData), path)
      expectZodError(assoc(prop, {}, validData), path)
    })

    it('valid', () => {
      expect(tokenBalanceSchema.parse(validData)).toStrictEqual(validData)
    })
  })
})
