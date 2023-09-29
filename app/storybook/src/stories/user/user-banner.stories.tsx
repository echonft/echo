import { UserBanner as Component } from '@echo/ui/components/user/details/user-banner'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Banner ',
  component: Component,
  parameters: {
    controls: {
      exclude: ['discordBannerUrl', 'discordBannerColor']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  args: {
    // TODO we need an URL
    discordBannerUrl: undefined,
    discordBannerColor: '#d11bd9'
  }
}

export const Default: Story = {
  args: {
    discordBannerUrl: undefined,
    discordBannerColor: '#d11bd9'
  }
}
