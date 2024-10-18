import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { walletMockCrewAddress } from '@echo/model/mocks/wallet/wallet-mock'
import type { Wallet } from '@echo/model/types/wallet'
import { collectionResponseSchema } from '@echo/opensea/validators/collection-response-schema'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, modify, pipe } from 'ramda'

describe('validators - collectionResponseSchema', () => {
  const mock = pipe(
    collectionMockSpiralId,
    getCollectionMockById,
    modify<'contract', Wallet, Wallet>('contract', assoc('chain', Chain.Sepolia)),
    dissoc('type')
  )()
  const response = {
    banner_image_url: mock.bannerUrl,
    category: 'whatever',
    collection: mock.slug,
    collection_offers_enabled: false,
    contracts: [mock.contract, assoc('chain', Chain.Blast, mock.contract)],
    created_date: '2021-04-16',
    description: mock.description,
    discord_url: mock.discordUrl,
    image_url: mock.profilePictureUrl,
    instagram_username: 'whatever',
    is_disabled: false,
    is_nsfw: false,
    name: mock.name,
    opensea_url: 'https://whatever.com',
    owner: walletMockCrewAddress(),
    project_url: 'https://whatever.com',
    safelist_status: 'verified',
    telegram_url: 'https://whatever.com',
    total_supply: mock.totalSupply,
    trait_offers_enabled: false,
    twitter_username: 'whatever',
    wiki_url: 'https://whatever.com'
  }

  it('without chain check', () => {
    expect(collectionResponseSchema().parse(response)).toStrictEqual(assoc('contract', undefined, mock))
  })

  it('with chain check', () => {
    expect(collectionResponseSchema({ chain: Chain.Blast }).parse(response)).toStrictEqual(
      assocPath(['contract', 'chain'], Chain.Blast, mock)
    )
    expect(collectionResponseSchema({ chain: Chain.BlastSepolia }).parse(response)).toBeUndefined()
  })
})
