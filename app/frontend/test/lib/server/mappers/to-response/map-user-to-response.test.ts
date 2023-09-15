import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { mapUserToResponse } from '@server/mappers/to-response/map-user-to-response'

describe('mappers - to-response - mapUserToResponse', () => {
  const user = getDiscordUserMockById('6rECUMhevHfxABZ1VNOm')
  it('converts the object', () => {
    expect(mapUserToResponse(user)).toStrictEqual({
      id: '6rECUMhevHfxABZ1VNOm',
      discordId: '884593489189433364',
      discordUsername: 'crewnft_',
      discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
      discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
      username: 'crewnft_',
      wallet: {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    })
  })
})
