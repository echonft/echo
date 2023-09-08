import { getUserById } from '../../mocks/model/user'
import { UserBanner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Banner ',
  component: Component,
  parameters: {
    controls: {
      exclude: ['discordBanner', 'discordId']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const { discordBanner, discordId } = getUserById('6rECUMhevHfxABZ1VNOm')
export const Standard: Story = {
  args: {
    discordBanner,
    discordId
  }
}

export const Default: Story = {
  args: {
    discordBanner: undefined,
    discordId
  }
}
