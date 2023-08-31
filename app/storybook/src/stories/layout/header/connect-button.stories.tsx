import { ConnectButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Connect Button',
  component: Component,
  argTypes: {
    onConnectClick: {
      control: false,
      action: 'clicked'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ConnectButton: Story = {}
