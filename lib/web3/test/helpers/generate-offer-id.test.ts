import type { Nft } from '@echo/model/types/nft/nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import type { User } from '@echo/model/types/user/user'
import { Chain } from '@echo/utils/constants/chain'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - generateOfferId', () => {
  // Value generated from the contract
  const contractGeneratedId = '0xcc241bff15d865e5b158c0817a3d7d562d3f631d683f48dcb96ed1b7f0e83a8f'
  const user = { wallet: { address: '0x7DA16cd402106Adaf39092215DbB54092b80B6E6' } } as unknown as User
  const nft = {
    collection: { contract: { chain: Chain.Ethereum, address: '0x7DA16cd402106Adaf39092215DbB54092b80B6E6' } },
    tokenId: 2
  } as unknown as Nft
  test('returns the same ID as contract for same values', () => {
    const offer: BaseOffer = {
      expiresAt: 1,
      receiver: user,
      receiverItems: [nft],
      sender: user,
      senderItems: [nft]
    } as BaseOffer

    expect(generateOfferId(offer)).toBe(contractGeneratedId)
  })
})
