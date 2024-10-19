import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxJohnnyId, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getUserMockByUsername, userMockCrewUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { castTo } from '@echo/utils/fp/cast-to' // import required types from respective modules
import { mapOfferToContractOffer } from '@echo/web3/mappers/map-offer-to-contract-offer'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { ContractOfferState } from '@echo/web3/types/contract-offer-state'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mappers - mapOfferToContractCreateOffer', () => {
  it('correctly maps a BaseOffer to ContractCreateOffer', () => {
    const testOffer: BaseOffer = {
      expiresAt: Date.now(),
      receiver: pipe(userMockCrewUsername, getUserMockByUsername)(),
      sender: pipe(userMockCrewUsername, getUserMockByUsername)(),
      receiverItems: [
        pipe(nftMockSpiralJohnnyId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)(),
        pipe(nftMockPxJohnnyId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()
      ],
      senderItems: [pipe(nftMockSpiralJohnnyId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()]
    }
    const result: ContractOffer = mapOfferToContractOffer(testOffer)
    expect(result).toBeDefined()
    expect(result.sender).toBe(formatWalletAddress(testOffer.sender.wallet))
    expect(result.receiver).toBe(formatWalletAddress(testOffer.receiver.wallet))
    expect(result.senderItems).toStrictEqual({
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          tokenId: 1
        }
      ]
    })
    expect(result.receiverItems).toStrictEqual({
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          tokenId: 1
        },
        {
          tokenAddress: '0x12c63bbd266db84e117356e664f3604055166cec',
          tokenId: 1
        }
      ]
    })
    expect(result.expiration).toBe(testOffer.expiresAt)
    expect(result.state).toBe(ContractOfferState.Open)
  })
})
