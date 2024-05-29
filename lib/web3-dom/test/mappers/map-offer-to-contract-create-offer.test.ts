import type { BaseOffer } from '@echo/model/types/base-offer' // import required types from respective modules
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getUserMockByUsername } from '@echo/model-mocks/user/user-mock'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { mapOfferToContractCreateOffer } from '@echo/web3-dom/mappers/map-offer-to-contract-create-offer'
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'
import { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOfferToContractCreateOffer', () => {
  const testOffer: BaseOffer = {
    expiresAt: Date.now(),
    receiver: getUserMockByUsername('crewnft_'),
    sender: getUserMockByUsername('johnnycagewins'),
    receiverItems: [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('QFjMRNChUAHNswkRADXh')],
    senderItems: [getNftMockById('8hHFadIrrooORfTOLkBg')]
  }

  it('correctly maps a BaseOffer to ContractCreateOffer', () => {
    const result: ContractCreateOffer = mapOfferToContractCreateOffer(testOffer)
    expect(result).toBeDefined()
    expect(result.sender).toBe(formatWalletAddress(testOffer.sender.wallet))
    expect(result.receiver).toBe(formatWalletAddress(testOffer.receiver.wallet))
    expect(result.senderItems).toStrictEqual({
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
          tokenId: 1
        }
      ]
    })
    expect(result.receiverItems).toStrictEqual({
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
          tokenId: 1
        },
        {
          tokenAddress: '0x12c63bbD266dB84e117356e664f3604055166CEc',
          tokenId: 1
        }
      ]
    })
    expect(result.expiration).toBe(testOffer.expiresAt)
    expect(result.state).toBe(ContractOfferState.OPEN)
  })
})
