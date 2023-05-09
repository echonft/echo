import { ConnectButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Layout/Header/Connect Button',
  component: Component,
  argTypes: {
    onConnect: {
      control: false,
      action: 'clicked'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const ConnectButton: Story = {}
