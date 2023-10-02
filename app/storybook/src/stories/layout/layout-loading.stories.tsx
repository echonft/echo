import { LayoutLoading as Component } from '@echo/ui/components/layout/layout-loading'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Loading Layout',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoadingLayout: Story = {}
