import { HomeHeroSkeleton as Component } from '@echo/ui/components/home/hero/skeleton/home-hero-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Hero',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {}
}
