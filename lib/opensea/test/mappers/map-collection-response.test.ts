import type { Contract } from '@echo/model/types/collection'
import { COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { getSupportedChains } from '@echo/utils/helpers/get-supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { describe, expect, it } from '@jest/globals'
import { assoc, head, modify, omit, pipe } from 'ramda'

describe('mappers - mapCollectionResponse', () => {
  it('maps correctly', () => {
    const supportedChain = pipe<[], NonEmptyArray<ChainName>, ChainName>(getSupportedChains, head)()
    const unsupportedChain = 'unsupported' as ChainName
    const mock = pipe(
      getCollectionMockById,
      modify<'contract', Contract, Contract>('contract', assoc('chain', supportedChain))
    )(COLLECTION_MOCK_SPIRAL_ID)
    const response: CollectionResponse = {
      collection: mock.slug,
      name: mock.name,
      description: mock.description,
      image_url: mock.profilePictureUrl,
      banner_image_url: mock.bannerUrl,
      owner: 'whatever',
      safelist_status: 'verified',
      category: 'whatever',
      is_disabled: false,
      is_nsfw: false,
      trait_offers_enabled: false,
      collection_offers_enabled: false,
      opensea_url: 'whatever',
      project_url: 'whatever',
      wiki_url: 'whatever',
      discord_url: mock.discordUrl,
      telegram_url: 'whatever',
      twitter_username: 'whatever',
      instagram_username: 'whatever',
      contracts: [assoc('chain', unsupportedChain, mock.contract), mock.contract],
      total_supply: mock.totalSupply,
      created_date: 'whatever'
    }
    const collection: ReturnType<typeof mapCollectionResponse> = pipe(omit(['swapsCount', 'verified']))(mock)
    expect(mapCollectionResponse(response)).toStrictEqual(collection)
  })
})
