import { TokenType } from '@echo/model/constants/token-type'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockPxContract, collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import type { Collection } from '@echo/model/types/collection/collection'
import type { NftCollection } from '@echo/model/types/nft/nft'
import { describe, expect, test } from '@jest/globals'

describe('mappers - nft - nftCollection', () => {
  const collection: Collection = {
    bannerUrl:
      'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ',
    contract: collectionMockPxContract(),
    description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
    discordUrl: 'https://discord.gg/pxmythics',
    name: 'pxMythics Genesis',
    slug: collectionMockPxSlug(),
    profilePictureUrl:
      'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ',
    totalSupply: 1077,
    type: TokenType.Erc721,
    verified: true
  }
  const expected: NftCollection = {
    contract: collectionMockPxContract(),
    name: 'pxMythics Genesis',
    slug: collectionMockPxSlug(),
    totalSupply: 1077
  }
  test('maps correctly', () => {
    expect(nftCollection(collection)).toStrictEqual(expected)
  })
})
