import { ConnectButton as Component } from '@echo/ui/src/components/layout/header/connect-button'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Connect Button',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const ConnectButton: Story = {}
