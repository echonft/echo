import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { erc1155NftMock, erc721NftMock, nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftAttribute } from '@echo/model/types/nft'
import {
  erc1155NftSchema,
  erc721NftSchema,
  nftAttributeSchema,
  nftIndexSchema,
  nftSchema,
  ownedErc1155NftSchema,
  ownedErc721NftSchema,
  ownedNftIndexSchema,
  ownedNftSchema,
  serializedNftSchema,
  serializeNftSchema
} from '@echo/model/validators/nft-schema'
import { describe, expect, it } from '@jest/globals'
import { dissoc, map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('nftSchema', () => {
  describe('nftAttributeSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => nftAttributeSchema.parse(data)).toThrow()
      try {
        nftAttributeSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if trait is invalid', () => {
      const path = ['trait']
      expectZodError({ trait: '', value: 'valid' }, path)
      expectZodError({ trait: undefined, value: 'valid' }, path)
      expectZodError({ trait: 1, value: 'valid' }, path)
      expectZodError({ trait: {}, value: 'valid' }, path)
    })

    it('should fail if value is invalid', () => {
      const path = ['value']
      expectZodError({ trait: 'valid', value: '' }, path)
      expectZodError({ trait: 'valid', value: undefined }, path)
      expectZodError({ trait: 'valid', value: 1 }, path)
      expectZodError({ trait: 'valid', value: {} }, path)
    })

    it('valid', () => {
      const validData: NftAttribute = {
        trait: 'valid',
        value: 'valid'
      }
      expect(nftAttributeSchema.parse(validData)).toStrictEqual(validData)
    })
  })

  describe('nftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => nftSchema.parse(data)).toThrow()
      try {
        nftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if attributes is not an array', () => {
      const invalidData = {
        attributes: {},
        collection: nftMockPx1.collection,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['attributes'])
    })

    it('should fail if collection is missing', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['collection'])
    })

    it('should fail if name is empty', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: nftMockPx1.collection,
        name: '',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['name'])
    })

    // TODO put back when we add the IPFS check
    // it('should fail if pictureUrl is not a valid URL', () => {
    //   const invalidData = {
    //     attributes: [{ trait: 'Color', value: 'Red' }],
    //     collection: nftMockPx1.collection,
    //     name: 'NFT Name',
    //     pictureUrl: 'not-a-url',
    //     tokenId: 1,
    //     type: TokenType.Erc721
    //   }
    //   expectZodError(invalidData, ['pictureUrl'])
    // })

    it('should fail if tokenId is not a positive integer', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: nftMockPx1.collection,
        name: 'NFT Name',
        tokenId: -1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['tokenId'])
    })

    it('should fail if type is not a valid enum value', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: nftMockPx1.collection,
        name: 'NFT Name',
        tokenId: 1,
        type: 'InvalidType' // Not a valid enum value
      }
      expectZodError(invalidData, ['type'])
    })

    it('valid', () => {
      expect(nftSchema.parse(nftMockPx1)).toStrictEqual(nftMockPx1)
      expect(nftSchema.parse(dissoc('owner', nftMockPx1))).toStrictEqual(dissoc('owner', nftMockPx1))
    })
  })

  describe('nftIndexSchema', () => {
    it('only keep the index', () => {
      expect(nftIndexSchema.parse(nftMockPx1)).toStrictEqual({
        collection: { slug: nftMockPx1.collection.slug },
        tokenId: nftMockPx1.tokenId
      })
    })
  })

  describe('ownedNftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => ownedNftSchema.parse(data)).toThrow()
      try {
        ownedNftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if owner is missing', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['owner'])
    })

    it('should fail if owner is invalid', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        owner: dissoc('username', userMockJohnny),
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['owner', 'username'])
    })

    it('valid', () => {
      expect(ownedNftSchema.parse(nftMockPx2)).toStrictEqual(nftMockPx2)
    })
  })

  describe('ownedNftIndexSchema Validation', () => {
    it('should only keep the index', () => {
      expect(ownedNftIndexSchema.parse(nftMockPx1)).toStrictEqual({
        collection: { slug: nftMockPx1.collection.slug },
        owner: nftMockPx1.owner,
        tokenId: nftMockPx1.tokenId
      })
    })
  })

  describe('erc721NftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc721NftSchema.parse(data)).toThrow()
      try {
        erc721NftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if type is invalid', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc1155
      }
      expectZodError(invalidData, ['type'])
    })

    it('valid', () => {
      const validData = dissoc('owner', erc721NftMock)
      expect(erc721NftSchema.parse(validData)).toStrictEqual(validData)
    })
  })

  describe('ownedErc721NftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => ownedErc721NftSchema.parse(data)).toThrow()
      try {
        ownedErc721NftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if owner is missing', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['owner'])
    })

    it('should fail if owner is invalid', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        owner: dissoc('username', userMockJohnny),
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['owner', 'username'])
    })

    it('valid', () => {
      expect(ownedErc721NftSchema.parse(erc721NftMock)).toStrictEqual(erc721NftMock)
    })
  })

  describe('erc1155NftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => erc1155NftSchema.parse(data)).toThrow()
      try {
        erc1155NftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if type is invalid', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['type'])
    })

    it('valid', () => {
      const validData = dissoc('owner', erc1155NftMock)
      expect(erc1155NftSchema.parse(validData)).toStrictEqual(validData)
    })
  })

  describe('ownedErc1155NftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => ownedErc721NftSchema.parse(data)).toThrow()
      try {
        ownedErc721NftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if owner is missing', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        tokenId: 1,
        type: TokenType.Erc1155
      }
      expectZodError(invalidData, ['owner'])
    })

    it('should fail if owner is invalid', () => {
      const invalidData = {
        attributes: [{ trait: 'Color', value: 'Red' }],
        collection: collectionMockPx,
        name: 'NFT Name',
        owner: dissoc('username', userMockJohnny),
        tokenId: 1,
        type: TokenType.Erc1155
      }
      expectZodError(invalidData, ['owner', 'username'])
    })

    it('valid', () => {
      expect(ownedErc1155NftSchema.parse(erc1155NftMock)).toStrictEqual(erc1155NftMock)
    })
  })

  describe('serializeNftSchema', () => {
    it('transforms correctly', () => {
      expect(serializeNftSchema.parse(nftMockPx1)).toStrictEqual(serializeNft(nftMockPx1))
    })
  })

  describe('serializedNftSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => serializedNftSchema.parse(data)).toThrow()
      try {
        serializedNftSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if the string does not have the right format', () => {
      const invalidData = [
        '',
        '.111',
        'slug-only',
        'slug-only.',
        'inv@lid Slug.10',
        'valid-slug.-2',
        'valid-slug.2.0',
        'valid-slug.2,12'
      ]
      for (const data of invalidData) {
        expectZodError(data, [])
      }
    })

    it('valid serialized nft should return the nft index', () => {
      expect(serializedNftSchema.parse('valid-slug.666')).toStrictEqual({
        collection: {
          slug: 'valid-slug'
        },
        tokenId: 666
      })
    })
  })
})
