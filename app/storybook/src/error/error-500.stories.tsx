import { Error500 as Component } from '@echo/ui/components/error/error-500'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Error',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const ServerError: Story = {}
