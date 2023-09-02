import { AuthUser } from '@echo/ui-model'

const authUser: AuthUser = {
  id: '6rECUMhevHfxABZ1VNOm',
  discordId: '884593489189433364',
  discordUsername: 'crewNFT_#2034',
  discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
  discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
  discordGuilds: [
    {
      discordId: '100'
    }
  ],
  nftsUpdatedAt: 1676984897,
  updatedAt: 1676984897,
  wallets: [
    {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
  ]
}

export function getAuthUser() {
  return authUser
}
