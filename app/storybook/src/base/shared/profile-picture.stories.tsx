// noinspection JSUnusedGlobalSymbols

import { ProfilePicture as Component } from '@echo/ui/components/base/profile-picture'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Shared/Profile Picture',
  component: Component,
  parameters: {
    controls: {
      exclude: ['pictureUrl', 'alt']
    }
  },
  argTypes: {
    size: {
      options: ['Small', 'Medium', 'Large'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ProfilePicture: Story = {
  args: {
    size: SIZE_LG,
    border: true,
    alt: 'johnnycagewins',
    pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}
