import { getDiscordUserMockByUserId } from '@echo/firestore-mocks/discord-user/get-discord-user-mock-by-user-id'
import { getWalletMockByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-user-id'
import { mapDiscordUserToResponse } from '@server/mappers/to-response/map-discord-user-to-response'

describe('mappers - to-response - mapDiscordUserToResponse', () => {
  const user = getDiscordUserMockByUserId('6rECUMhevHfxABZ1VNOm')
  const wallet = getWalletMockByUserId('6rECUMhevHfxABZ1VNOm')
  it('converts the object', () => {
    expect(mapDiscordUserToResponse(user, 'crewnft_', [wallet])).toStrictEqual({
      discordId: '884593489189433364',
      discordUsername: 'crewnft_',
      discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
      discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
      username: 'crewnft_',
      wallets: [
        {
          address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
          chainId: 1
        }
      ]
    })
  })
})
