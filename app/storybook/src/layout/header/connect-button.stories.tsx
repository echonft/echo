import { ConnectButton as Component } from '@echo/ui/components/layout/header/connect-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Connect Button',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const ConnectButton: Story = {}
