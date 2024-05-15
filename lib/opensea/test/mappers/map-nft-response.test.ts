import type { Contract } from '@echo/model/types/collection'
import { mapNftResponse } from '@echo/opensea/mappers/map-nft-response'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapNftResponse', () => {
  it('no undefined values', () => {
    const response: Omit<GetNftResponse, 'contract'> & { contract: Contract } = {
      identifier: '1376',
      collection: 'spiral-frequencies',
      contract: {
        address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
        chainId: 1
      },
      token_standard: 'erc721',
      name: 'Spiral Frequencies #1376',
      description: 'whatever',
      image_url: 'HTTPS://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
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
    const nft: ReturnType<typeof mapNftResponse> = {
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ],
      animationUrl: 'https://animation.url/',
      blurUrl: 'https://blur.io/eth/asset/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      collection: {
        slug: 'spiral-frequencies',
        contract: {
          address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
          chainId: 1
        }
      },
      name: 'Spiral Frequencies #1376',
      metadataUrl: 'https://metadata.url/',
      openSeaUrl: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1376
    }
    expect(mapNftResponse(response)).toStrictEqual(nft)
  })

  it('with undefined values', () => {
    const response: Omit<GetNftResponse, 'contract'> & { contract: Contract } = {
      identifier: '1376',
      collection: 'spiral-frequencies',
      contract: {
        address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
        chainId: 1
      },
      token_standard: 'erc721',
      name: 'Spiral Frequencies #1376',
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
    const nft: ReturnType<typeof mapNftResponse> = {
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ],
      animationUrl: undefined,
      blurUrl: 'https://blur.io/eth/asset/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      collection: {
        slug: 'spiral-frequencies',
        contract: {
          address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
          chainId: 1
        }
      },
      name: 'Spiral Frequencies #1376',
      metadataUrl: undefined,
      openSeaUrl: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
      pictureUrl: undefined,
      tokenId: 1376
    }
    expect(mapNftResponse(response)).toStrictEqual(nft)
  })
})
