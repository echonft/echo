// noinspection JSUnusedGlobalSymbols

import { HomeSkeleton as Component } from '@echo/ui/pages/home/skeleton/home-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
