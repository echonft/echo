import { Logo as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Logos/Echo',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Echo: Story = {}
