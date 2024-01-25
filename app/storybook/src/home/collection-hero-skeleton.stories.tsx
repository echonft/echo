// noinspection JSUnusedGlobalSymbols

import { HomeHeroSkeleton as Component } from '@echo/ui/pages/home/hero/skeleton/home-hero-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Hero',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {}
}
