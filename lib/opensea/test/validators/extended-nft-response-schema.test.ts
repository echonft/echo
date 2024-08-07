import { collectionMockSpiralSlug } from '@echo/model/mocks/collection/collection-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { walletMockCrewAddress, walletMockJohnnyAddress } from '@echo/model/mocks/wallet/wallet-mock'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftExtendedResponseSchema } from '@echo/opensea/validators/nft-extended-response-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, modify, pick, pipe } from 'ramda'

describe('validators - nftExtendedResponseSchema', () => {
  const nftMock = getNftMockById(nftMockSpiralJohnnyId())

  it('no undefined values', () => {
    const response = {
      identifier: nftMock.tokenId.toString(),
      collection: collectionMockSpiralSlug(),
      contract: nftMock.collection.contract.address,
      token_standard: 'erc721',
      name: nftMock.name,
      description: 'whatever',
      image_url: nftMock.pictureUrl,
      metadata_url: nftMock.metadataUrl,
      opensea_url: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      animation_url: nftMock.animationUrl,
      is_suspicious: false,
      creator: walletMockCrewAddress(),
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
      owners: [{ address: walletMockJohnnyAddress(), quantity: 1 }]
    }
    const nft = pipe<[Nft], Omit<Nft, 'owner'>, PartialNft>(
      dissoc('owner'),
      modify<'collection', Collection, Pick<Collection, 'contract' | 'slug'>>('collection', pick(['contract', 'slug']))
    )(nftMock)
    expect(nftExtendedResponseSchema(nftMock.collection.contract.chain).parse(response)).toStrictEqual(nft)
  })

  it('with undefined values', () => {
    const response = {
      identifier: nftMock.tokenId.toString(),
      collection: collectionMockSpiralSlug(),
      contract: nftMock.collection.contract.address,
      token_standard: 'erc721',
      name: nftMock.name,
      description: 'whatever',
      image_url: undefined,
      metadata_url: undefined,
      opensea_url: undefined,
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      animation_url: undefined,
      is_suspicious: false,
      creator: walletMockCrewAddress(),
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
      owners: [{ address: walletMockJohnnyAddress(), quantity: 1 }]
    }
    const nft: PartialNft = pipe<[Nft], Omit<Nft, 'owner'>, PartialNft, PartialNft, PartialNft, PartialNft>(
      dissoc('owner'),
      modify<'collection', Collection, Pick<Collection, 'contract' | 'slug'>>('collection', pick(['contract', 'slug'])),
      assoc('animationUrl', undefined),
      assoc('metadataUrl', undefined),
      assoc('pictureUrl', undefined)
    )(nftMock)
    expect(nftExtendedResponseSchema(nftMock.collection.contract.chain).parse(response)).toStrictEqual(nft)
  })

  it('returns undefined if is is suspicious', () => {
    const response = {
      identifier: nftMock.tokenId.toString(),
      collection: collectionMockSpiralSlug(),
      contract: nftMock.collection.contract.address,
      token_standard: 'erc721',
      name: nftMock.name,
      description: 'whatever',
      image_url: nftMock.pictureUrl,
      metadata_url: nftMock.metadataUrl,
      opensea_url: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      updated_at: '2023-07-20T16:02:18.959996',
      is_disabled: false,
      is_nsfw: false,
      animation_url: nftMock.animationUrl,
      is_suspicious: true,
      creator: walletMockCrewAddress(),
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
      owners: [{ address: walletMockJohnnyAddress(), quantity: 1 }]
    }
    expect(nftExtendedResponseSchema(nftMock.collection.contract.chain).parse(response)).toBeUndefined()
  })
})
