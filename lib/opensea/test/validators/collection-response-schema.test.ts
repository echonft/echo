import { Chain } from '@echo/model/constants/chain'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import type { Contract } from '@echo/model/types/contract'
import { collectionResponseSchema } from '@echo/opensea/validators/collection-response-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, modify, pipe } from 'ramda'

describe('validators - collectionResponseSchema', () => {
  const mock = pipe(
    modify<'contract', Contract, Contract>('contract', assoc('chain', Chain.Sepolia)),
    dissoc('type')
  )(collectionMockSpiral)
  const response = {
    category: 'whatever',
    collection: mock.slug,
    collection_offers_enabled: false,
    contracts: [mock.contract, assoc('chain', Chain.Blast, mock.contract)],
    created_date: '2021-04-16',
    description: mock.description,
    discord_url: mock.discordUrl,
    image_url: mock.pictureUrl,
    instagram_username: 'whatever',
    is_disabled: false,
    is_nsfw: false,
    name: mock.name,
    opensea_url: 'https://whatever.com',
    owner: walletMockCrew.address,
    project_url: 'https://whatever.com',
    safelist_status: 'verified',
    telegram_url: 'https://whatever.com',
    total_supply: mock.totalSupply,
    trait_offers_enabled: false,
    twitter_username: 'whatever',
    wiki_url: 'https://whatever.com'
  }

  it('with chain check', () => {
    expect(collectionResponseSchema(Chain.Blast).parse(response)).toStrictEqual(
      assocPath(['contract', 'chain'], Chain.Blast, mock)
    )
    expect(collectionResponseSchema(Chain.BlastSepolia).parse(response)).toBeUndefined()
  })
})
