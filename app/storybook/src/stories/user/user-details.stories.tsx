import { UserDetails as Component } from '@echo/ui/components/user/details/user-details'
import { SizeLG } from '@echo/ui/constants/size'
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
      exclude: ['discordUsername', 'discordBannerUrl', 'discordAvatarUrl', 'wallet']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Details: Story = {
  args: {
    discordUsername: 'johnnycagewins',
    discordBannerColor: '#d11bd9',
    discordBannerUrl: undefined,
    discordAvatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    wallet: { address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', chainId: 1 },
    size: SizeLG
  }
}
