import { PageLayoutSkeleton as Component } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Loading Layout',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoadingLayout: Story = {}
