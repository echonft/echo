import { TokenType } from '@echo/model/constants/token-type'
import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import {
  collectionSchema,
  serializeCollectionSchema,
  serializedCollectionSchema
} from '@echo/model/validators/collection-schema'
import { describe, expect, it } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('collectionSchema', () => {
  describe('collectionSchema', () => {
    function expectZodError(data: unknown, path: (string | number)[]) {
      expect(() => collectionSchema.parse(data)).toThrow()
      try {
        collectionSchema.parse(data)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
      }
    }

    it('should fail if contract is missing', () => {
      const invalidData = {
        description: 'A valid description',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['contract'])
    })

    it('should fail if description is empty', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: '',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['description'])
    })

    it('should fail if discordUrl is not a valid URL', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        discordUrl: 'not-a-url',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['discordUrl'])
    })

    it('should fail if name is missing', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['name'])
    })

    it('should fail if pictureUrl is not a valid URL', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        pictureUrl: 'not-a-url',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['pictureUrl'])
    })

    it('should fail if slug is missing', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        totalSupply: 100,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['slug'])
    })

    it('should fail if totalSupply is not a positive integer', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: -1,
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['totalSupply'])
    })

    it('should fail if twitterUsername is empty', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100,
        twitterUsername: '',
        type: TokenType.Erc721
      }
      expectZodError(invalidData, ['twitterUsername'])
    })

    it('should fail if type is missing', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100
      }
      expectZodError(invalidData, ['type'])
    })

    it('should fail if websiteUrl is not a valid URL', () => {
      const invalidData = {
        contract: collectionMockPx.contract,
        description: 'A valid description',
        name: 'Valid Name',
        slug: 'valid-slug',
        totalSupply: 100,
        type: TokenType.Erc721,
        websiteUrl: 'not-a-url'
      }
      expectZodError(invalidData, ['websiteUrl'])
    })

    it('valid', () => {
      expect(collectionSchema.parse(collectionMockPx)).toStrictEqual(collectionMockPx)
    })
  })

  describe('serializeCollectionSchema', () => {
    it('transform correctly', () => {
      expect(serializeCollectionSchema.parse(collectionMockPx)).toStrictEqual(serializeCollection(collectionMockPx))
    })
  })

  describe('serializedCollectionSchema', () => {
    it('transform correctly', () => {
      expect(serializedCollectionSchema.parse(serializeCollection(collectionMockPx))).toStrictEqual(
        collectionIndex(collectionMockPx)
      )
    })
  })
})
