import { Chain } from '@echo/model/constants/chain'
import { baseOfferMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import { echoOfferMock } from '@echo/web3/mocks/echo-offer-mock'
import { readEchoOfferSchema } from '@echo/web3/validators/read-echo-offer-schema'
import { describe, expect, test } from '@jest/globals'

describe('readEchoOfferSchema', () => {
  test('maps correctly', () => {
    const readValues = [
      baseOfferMockFromJohnnycage.sender.wallet,
      baseOfferMockFromJohnnycage.receiver.wallet,
      {
        chainId: BigInt(1),
        items: [
          { tokenId: BigInt(1), tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7' },
          {
            tokenId: BigInt(2),
            tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7'
          }
        ]
      },
      {
        chainId: BigInt(1),
        items: [{ tokenId: BigInt(3), tokenAddress: '0x12c63bbd266db84e117356e664f3604055166cec' }]
      },
      BigInt(baseOfferMockFromJohnnycage.expiresAt),
      EchoOfferState.Open
    ]
    expect(readEchoOfferSchema(Chain.Ethereum).parse(readValues)).toStrictEqual(echoOfferMock)
  })
})
