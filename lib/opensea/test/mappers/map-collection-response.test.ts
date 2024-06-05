import type { Wallet } from '@echo/model/types/wallet'
import { collectionMockSpiralId } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { describe, expect, it } from '@jest/globals'
import { assoc, head, modify, omit, pipe } from 'ramda'

describe('mappers - mapCollectionResponse', () => {
  it('maps correctly', () => {
    const supportedChain = pipe(getSupportedChains, head)()
    const unsupportedChain = 'unsupported' as ChainName
    const mock = pipe(
      getCollectionMockById,
      modify<'contract', Wallet, Wallet>('contract', assoc('chain', supportedChain))
    )(collectionMockSpiralId())
    const response: CollectionResponse = {
      banner_image_url: mock.bannerUrl,
      category: 'whatever',
      collection: mock.slug,
      collection_offers_enabled: false,
      contracts: [assoc('chain', unsupportedChain, mock.contract), mock.contract],
      created_date: 'whatever',
      description: mock.description,
      discord_url: mock.discordUrl,
      image_url: mock.profilePictureUrl,
      instagram_username: 'whatever',
      is_disabled: false,
      is_nsfw: false,
      name: mock.name,
      opensea_url: 'whatever',
      owner: 'whatever',
      project_url: 'whatever',
      safelist_status: 'verified',
      telegram_url: 'whatever',
      total_supply: mock.totalSupply,
      trait_offers_enabled: false,
      twitter_username: 'whatever',
      wiki_url: 'whatever'
    }
    const collection: ReturnType<typeof mapCollectionResponse> = pipe(omit(['swapsCount']))(mock)
    expect(mapCollectionResponse(response)).toStrictEqual(collection)
  })
})
