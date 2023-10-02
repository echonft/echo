import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getWalletMocksByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mocks-by-user-id'
import { mapUserToResponse } from '@server/mappers/to-response/map-user-to-response'

describe('mappers - to-response - mapDiscordUserToResponse', () => {
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
  const wallets = getWalletMocksByUserId('6rECUMhevHfxABZ1VNOm')
  const response: UserResponse = {
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    },
    username: 'crewnft_',
    wallets: [
      {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    ]
  }
  it('converts the object', () => {
    expect(mapUserToResponse(user, wallets)).toStrictEqual(response)
  })
})
