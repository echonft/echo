import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { isNil } from 'ramda'

const discordProfileMock: Record<string, DiscordProfile> = {
  crewnft_: {
    username: USER_MOCK_CREW_USERNAME,
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    bannerColor: '#ffffff',
    discriminator: '0',
    id: USER_MOCK_CREW_USERNAME
  },
  johnnycagewins: {
    username: USER_MOCK_JOHNNY_USERNAME,
    avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
    bannerColor: '#d11bd9',
    discriminator: '0',
    id: USER_MOCK_JOHNNY_USERNAME
  }
}

export function getDiscordProfileMockByUsername(username: string): DiscordProfile {
  const mock = discordProfileMock[username]
  if (isNil(mock)) {
    throw Error(`wrong discord profile mock username: ${username}`)
  }
  return mock
}
