import { getDiscordProfileMockByUsername } from '@echo/model/mocks/user/discord-profile-mock'
import { getCountsByUsername } from '@echo/model/mocks/user/user-counts-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import type { UserProfile } from '@echo/model/types/user-profile'
import { dissoc, isNil, pipe } from 'ramda'

const userProfileMock: Record<string, UserProfile> = {
  crewnft_: {
    username: userMockCrewUsername(),
    discord: pipe(getDiscordProfileMockByUsername, dissoc('id'), dissoc('discriminator'))(userMockCrewUsername()),
    wallets: [getWalletMockByUsername(userMockCrewUsername())],
    ...getCountsByUsername(userMockCrewUsername())
  },
  johnnycagewins: {
    username: userMockJohnnyUsername(),
    discord: pipe(getDiscordProfileMockByUsername, dissoc('id'), dissoc('discriminator'))(userMockJohnnyUsername()),
    wallets: [getWalletMockByUsername(userMockJohnnyUsername())],
    ...getCountsByUsername(userMockJohnnyUsername())
  }
}

export function getUserProfileMockByUsername(username: string) {
  const mock = userProfileMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user profile mock username: ${username}`)
  }
  return mock
}
