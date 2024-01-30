// noinspection JSUnusedGlobalSymbols

import { ProfilePicture as Component } from '@echo/ui/components/base/profile-picture'
import { PROFILE_PICTURE_SIZES } from '@echo/ui/constants/profile-picture-size'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component,
  argTypes: {
    border: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    size: {
      defaultValue: SIZE_LG,
      options: PROFILE_PICTURE_SIZES,
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['pictureUrl', 'alt']
    }
  }
}

export default metadata

export const ProfilePicture: StoryObj<typeof Component> = {
  args: {
    size: SIZE_LG,
    border: true,
    alt: 'johnnycagewins',
    pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}
