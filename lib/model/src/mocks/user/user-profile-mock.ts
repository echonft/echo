import { getCountsByUsername } from '@echo/model/mocks/user/user-counts-mock'
import { getUserDiscordProfileMockByUsername } from '@echo/model/mocks/user/user-discord-profile-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import type { UserProfile } from '@echo/model/types/user/user-profile'
import { dissoc, isNil, pipe } from 'ramda'

export function getUserProfileMockByUsername(username: string) {
  const userProfileMock: Record<string, UserProfile> = {
    crewnft_: {
      username: userMockCrewUsername(),
      discord: pipe(userMockCrewUsername, getUserDiscordProfileMockByUsername, dissoc('id'), dissoc('discriminator'))(),
      wallets: [pipe(userMockCrewUsername, getWalletMockByUsername)()],
      ...getCountsByUsername(userMockCrewUsername())
    },
    johnnycagewins: {
      username: userMockJohnnyUsername(),
      discord: pipe(
        userMockJohnnyUsername,
        getUserDiscordProfileMockByUsername,
        dissoc('id'),
        dissoc('discriminator')
      )(),
      wallets: [pipe(userMockJohnnyUsername, getWalletMockByUsername)()],
      ...getCountsByUsername(userMockJohnnyUsername())
    }
  }
  const mock = userProfileMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user profile mock username: ${username}`)
  }
  return mock
}
