import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import type { Collection } from '@echo/model/types/collection'
import type { Nft, NftCollection } from '@echo/model/types/nft'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftExtendedResponseSchema } from '@echo/opensea/validators/nft-extended-response-schema'
import { describe, expect, it } from '@jest/globals'
import { dissoc, modify, pick, pipe } from 'ramda'

describe('validators - nftExtendedResponseSchema', () => {
  it('no undefined values', () => {
    const response = {
      identifier: nftMockSpiral1.tokenId.toString(),
      collection: collectionMockSpiral.slug,
      contract: nftMockSpiral1.collection.contract.address,
      token_standard: TokenType.Erc721,
      name: nftMockSpiral1.name,
      description: 'whatever',
      image_url: nftMockSpiral1.pictureUrl,
      opensea_url: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      is_suspicious: false,
      creator: walletMockCrew.address,
      traits: [
        { value: 'archimedean', trait_type: 'Algorithm' },
        { value: 'main', trait_type: 'Ring' },
        { value: 'movie', trait_type: 'Animation' },
        { value: '5', trait_type: 'Speed' },
        { value: 'cumulus', trait_type: 'Density' },
        { value: '0001', trait_type: 'Colors' },
        { value: 'random1', trait_type: 'Palette' },
        { value: '#complement', trait_type: 'Background' }
      ],
      owners: [{ address: walletMockCrew.address, quantity: 1 }]
    }
    const nft = pipe<[Nft], Omit<Nft, 'owner'>, PartialNft>(
      dissoc('owner'),
      modify<'collection', NftCollection, Pick<Collection, 'contract' | 'slug'>>(
        'collection',
        pick(['contract', 'slug'])
      )
    )(nftMockSpiral1)
    expect(nftExtendedResponseSchema(nftMockSpiral1.collection.contract.chain).parse(response)).toStrictEqual(nft)
  })

  it('with undefined values', () => {
    const response = {
      identifier: nftMockSpiral1.tokenId.toString(),
      collection: collectionMockSpiral.slug,
      contract: nftMockSpiral1.collection.contract.address,
      token_standard: TokenType.Erc721,
      name: nftMockSpiral1.name,
      description: 'whatever',
      image_url: undefined,
      opensea_url: undefined,
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      is_suspicious: false,
      creator: walletMockCrew.address,
      traits: [
        { value: 'archimedean', trait_type: 'Algorithm' },
        { value: 'main', trait_type: 'Ring' },
        { value: 'movie', trait_type: 'Animation' },
        { value: '5', trait_type: 'Speed' },
        { value: 'cumulus', trait_type: 'Density' },
        { value: '0001', trait_type: 'Colors' },
        { value: 'random1', trait_type: 'Palette' },
        { value: '#complement', trait_type: 'Background' }
      ],
      owners: [{ address: walletMockCrew.address, quantity: 1 }]
    }
    const nft: PartialNft = pipe<[Nft], Nft, Nft, PartialNft>(
      dissoc('owner'),
      dissoc('pictureUrl'),
      modify<'collection', NftCollection, Pick<Collection, 'contract' | 'slug'>>(
        'collection',
        pick(['contract', 'slug'])
      )
    )(nftMockSpiral1)
    expect(nftExtendedResponseSchema(nftMockSpiral1.collection.contract.chain).parse(response)).toStrictEqual(nft)
  })

  it('returns undefined if is is suspicious', () => {
    const response = {
      identifier: nftMockSpiral1.tokenId.toString(),
      collection: collectionMockSpiral.slug,
      contract: nftMockSpiral1.collection.contract.address,
      token_standard: TokenType.Erc721,
      name: nftMockSpiral1.name,
      description: 'whatever',
      image_url: nftMockSpiral1.pictureUrl,
      opensea_url: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      is_suspicious: true,
      creator: walletMockCrew.address,
      traits: [
        { value: 'archimedean', trait_type: 'Algorithm' },
        { value: 'main', trait_type: 'Ring' },
        { value: 'movie', trait_type: 'Animation' },
        { value: '5', trait_type: 'Speed' },
        { value: 'cumulus', trait_type: 'Density' },
        { value: '0001', trait_type: 'Colors' },
        { value: 'random1', trait_type: 'Palette' },
        { value: '#complement', trait_type: 'Background' }
      ],
      owners: [{ address: walletMockCrew.address, quantity: 1 }]
    }
    expect(nftExtendedResponseSchema(nftMockSpiral1.collection.contract.chain).parse(response)).toBeUndefined()
  })
})
