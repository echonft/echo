import { Spinner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Spinner',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Spinner: Story = {}
