// noinspection JSUnusedGlobalSymbols

import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { Profile as Component } from '@echo/ui/components/base/profile'
import { PROFILE_PICTURE_SIZES } from '@echo/ui/constants/profile-picture-size'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  pictureSize: ProfilePictureSize
  pictureBorder: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Base/Profile',
  args: {
    pictureSize: SIZE_LG,
    pictureBorder: true
  },
  argTypes: {
    pictureBorder: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    pictureSize: {
      defaultValue: SIZE_LG,
      options: PROFILE_PICTURE_SIZES,
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Profile: StoryObj<ComponentType> = {
  render: ({ pictureSize, pictureBorder }) => {
    return (
      <Component
        picture={{
          alt: userMockJohnnyUsername(),
          pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          size: pictureSize,
          border: pictureBorder
        }}
      />
    )
  }
}
