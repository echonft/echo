import { BannerSkeleton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Banner ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
