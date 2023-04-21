import { IconSize, Logo as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Logos/Echo',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Echo: Story = {
  args: {
    size: IconSize.CARD
  }
}
