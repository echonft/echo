import { baseOfferMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import type { EchoOffer } from '@echo/web3/types/echo-offer'

export const echoOfferMock: EchoOffer = {
  sender: baseOfferMockFromJohnnycage.sender.wallet.address,
  receiver: baseOfferMockFromJohnnycage.receiver.wallet.address,
  receiverItems: {
    chainId: 1,
    items: [{ tokenIdOrAmount: 3, tokenAddress: '0x12c63bbd266db84e117356e664f3604055166cec', tokenType: 1 }]
  },
  senderItems: {
    chainId: 1,
    items: [
      { tokenIdOrAmount: 1, tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7', tokenType: 1 },
      {
        tokenIdOrAmount: 2,
        tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
        tokenType: 1
      }
    ]
  },
  expiration: baseOfferMockFromJohnnycage.expiresAt,
  state: EchoOfferState.Open
}
