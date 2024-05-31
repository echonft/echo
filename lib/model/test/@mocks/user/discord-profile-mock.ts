import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { isNil } from 'ramda'

export function getDiscordProfileMockByUsername(username: string): DiscordProfile {
  const discordProfileMock: Record<string, DiscordProfile> = {
    crewnft_: {
      username: userMockCrewUsername(),
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff',
      discriminator: '0',
      id: userMockCrewUsername()
    },
    johnnycagewins: {
      username: userMockJohnnyUsername(),
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      bannerColor: '#d11bd9',
      discriminator: '0',
      id: userMockJohnnyUsername()
    }
  }
  const mock = discordProfileMock[username]
  if (isNil(mock)) {
    throw Error(`wrong discord profile mock username: ${username}`)
  }
  return mock
}
