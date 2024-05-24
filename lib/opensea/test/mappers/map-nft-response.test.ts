import { COLLECTION_MOCK_SPIRAL_SLUG } from '@echo/model-mocks/collection/collection-mock'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { mapExtendedNftResponse, type MapNftResponseArgs } from '@echo/opensea/mappers/map-extended-nft-response'
import { describe, expect, it } from '@jest/globals'
import { assoc, omit, pipe } from 'ramda'

describe('mappers - mapNftResponse', () => {
  const nftMock = getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)

  it('no undefined values', () => {
    const response: MapNftResponseArgs = {
      identifier: nftMock.tokenId.toString(),
      collection: COLLECTION_MOCK_SPIRAL_SLUG,
      contract: nftMock.collection.contract,
      token_standard: 'erc721',
      name: nftMock.name,
      description: 'whatever',
      image_url: nftMock.pictureUrl,
      metadata_url: 'HTTPS://metadata.url/',
      opensea_url: 'HTTPS://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      updated_at: 'whatever',
      is_disabled: false,
      is_nsfw: false,
      animation_url: 'HTTPS://animation.url/',
      is_suspicious: false,
      creator: 'whatever',
      traits: [
        { value: 'archimedean', trait_type: 'Algorithm', display_type: undefined, max_value: undefined },
        { value: 'main', trait_type: 'Ring', display_type: undefined, max_value: undefined },
        { value: 'movie', trait_type: 'Animation', display_type: undefined, max_value: undefined },
        { value: '5', trait_type: 'Speed', display_type: undefined, max_value: undefined },
        { value: 'cumulus', trait_type: 'Density', display_type: undefined, max_value: undefined },
        { value: '0001', trait_type: 'Colors', display_type: undefined, max_value: undefined },
        { value: 'random1', trait_type: 'Palette', display_type: undefined, max_value: undefined },
        { value: '#complement', trait_type: 'Background', display_type: undefined, max_value: undefined }
      ],
      owners: [{ address: '0xwhatever', quantity: 1 }]
    }
    const nft: ReturnType<typeof mapExtendedNftResponse> = pipe(
      omit(['collection', 'owner', 'updatedAt']),
      assoc('collection', { contract: nftMock.collection.contract, slug: nftMock.collection.slug })
    )(nftMock)
    expect(mapExtendedNftResponse(response)).toStrictEqual(nft)
  })

  it('with undefined values', () => {
    const response: MapNftResponseArgs = {
      identifier: nftMock.tokenId.toString(),
      collection: COLLECTION_MOCK_SPIRAL_SLUG,
      contract: nftMock.collection.contract,
      token_standard: 'erc721',
      name: nftMock.name,
      description: 'whatever',
      image_url: undefined,
      metadata_url: undefined,
      opensea_url: undefined,
      updated_at: 'whatever',
      is_disabled: false,
      is_nsfw: false,
      animation_url: undefined,
      is_suspicious: false,
      creator: 'whatever',
      traits: [
        { value: 'archimedean', trait_type: 'Algorithm', display_type: undefined, max_value: undefined },
        { value: 'main', trait_type: 'Ring', display_type: undefined, max_value: undefined },
        { value: 'movie', trait_type: 'Animation', display_type: undefined, max_value: undefined },
        { value: '5', trait_type: 'Speed', display_type: undefined, max_value: undefined },
        { value: 'cumulus', trait_type: 'Density', display_type: undefined, max_value: undefined },
        { value: '0001', trait_type: 'Colors', display_type: undefined, max_value: undefined },
        { value: 'random1', trait_type: 'Palette', display_type: undefined, max_value: undefined },
        { value: '#complement', trait_type: 'Background', display_type: undefined, max_value: undefined }
      ],
      owners: [{ address: '0xwhatever', quantity: 1 }]
    }
    const nft: ReturnType<typeof mapExtendedNftResponse> = pipe(
      omit(['collection', 'owner', 'updatedAt']),
      assoc('collection', { contract: nftMock.collection.contract, slug: nftMock.collection.slug }),
      assoc('animationUrl', undefined),
      assoc('metadataUrl', undefined),
      assoc('pictureUrl', undefined)
    )(nftMock)
    expect(mapExtendedNftResponse(response)).toStrictEqual(nft)
  })
})
