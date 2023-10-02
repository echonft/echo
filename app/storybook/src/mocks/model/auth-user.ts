import type { AuthUser } from '@echo/ui/types/model/auth-user'

const authUser: AuthUser = {
  id: '6rECUMhevHfxABZ1VNOm',
  username: 'crewnft_',
  discord: {
    id: '884593489189433364',
    username: 'crewnft_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    bannerColor: '#ffffff'
  },
  updatedAt: 1676984897,
  sessionToken: 'token',
  wallets: [{ address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', chainId: 1 }]
}

export function getAuthUser() {
  return authUser
}
