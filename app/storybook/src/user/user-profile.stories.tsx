// noinspection JSUnusedGlobalSymbols

import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { getUserProfileMockByUsername } from '@echo/model/mocks/user/user-profile-mock'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { type Meta, type StoryObj } from '@storybook/react'
import { assocPath, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type ImageType = 'Default' | 'Image'
type ComponentType = FunctionComponent<{ image: ImageType }>

const metadata: Meta<ComponentType> = {
  title: 'User/Profile ',
  args: {
    image: 'Image'
  },
  argTypes: {
    image: {
      defaultValue: 'Image',
      options: ['Default', 'Image'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Profile: StoryObj<ComponentType> = {
  render: ({ image }) => {
    const profile = pipe(
      getUserProfileMockByUsername,
      assocPath(
        ['discord', 'avatarUrl'],
        image === 'Image'
          ? 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
          : undefined
      )
    )(userMockJohnnyUsername())
    return <UserProfile profile={profile} />
  }
}
