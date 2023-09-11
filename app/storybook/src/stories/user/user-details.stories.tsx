import { getUserById } from '../../mocks/model/user'
import { UserDetails as Component } from '@echo/ui/src/components/user/details/user-details'
import { SizeLG } from '@echo/ui/src/constants/size'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Details ',
  component: Component,
  argTypes: {
    size: {
      defaultValue: 'Medium',
      options: ['Medium', 'Large'],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['discordUsername', 'discordAvatar', 'discordBanner', 'discordId', 'wallet']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const { discordUsername, discordBanner, discordAvatar, discordId, wallet } = getUserById('6rECUMhevHfxABZ1VNOm')

export const Details: Story = {
  args: {
    discordUsername,
    discordAvatar,
    discordBanner,
    discordId,
    wallet,
    size: SizeLG
  }
}
