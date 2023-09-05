import { ErrorPage as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Error',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Error: Story = {}
