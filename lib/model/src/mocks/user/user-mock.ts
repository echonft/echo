import { getDiscordProfileMockByUsername } from '@echo/model/mocks/user/discord-profile-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import type { User } from '@echo/model/types/user'
import type { Username } from '@echo/model/types/username'
import { isNil, omit, pipe } from 'ramda'

export function userMockCrewUsername(): Username {
  return 'crewnft_'
}
export function userMockJohnnyUsername(): Username {
  return 'johnnycagewins'
}

export function getUserMockByUsername(username: string) {
  const userMock: Record<string, User> = {
    crewnft_: {
      username: userMockCrewUsername(),
      discord: pipe(userMockCrewUsername, getDiscordProfileMockByUsername, omit(['id', 'discriminator']))(),
      wallet: getWalletMockByUsername(userMockCrewUsername())
    },
    johnnycagewins: {
      username: userMockJohnnyUsername(),
      discord: pipe(userMockJohnnyUsername, getDiscordProfileMockByUsername, omit(['id', 'discriminator']))(),
      wallet: getWalletMockByUsername(userMockJohnnyUsername())
    }
  }

  const mock = userMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user mock username: ${username}`)
  }
  return mock
}
